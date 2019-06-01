import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import * as nodemailer from 'nodemailer';
import * as ejs from 'ejs';
import { promisify } from 'util';
import { randomBytes } from 'crypto';
import { resolve } from 'path';
import { generateTransport, makeANiceEmail } from '../../mail';
import { MutationResolvers } from '../../generated/resolvers';
// eslint-disable-next-line import/no-cycle
import { TypeMap } from './types/TypeMap';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface MutationParent {
}

const Mutation: MutationResolvers.Type<TypeMap> = {
  getMagicLink: async (parent, args, ctx) => {
    const email = args.email.toLowerCase();
    const user = await ctx.db.user({ email });
    if (!user) {
      return false;
    }
    const randomBytesPromiseified = promisify(randomBytes);
    const loginToken = (await randomBytesPromiseified(20)).toString('hex');
    const loginTokenExpiry = Date.now() + (60 * 60 * 1000); // 1 hour from now
    const userUpdate = await ctx.db.updateUser({
      where: { email },
      data: { loginToken, loginTokenExpiry },
    });
    const frontendUrl = `${ctx.request.protocol}://${ctx.request.get('host')}`;

    // TODO: Only add `#` when using HashRouter.
    const link = `${frontendUrl}/#/account/login/token/${loginToken}`;
    const emailBody = await ejs.renderFile<string>(
      resolve(__dirname, '../../emailTemplates/magicLink.ejs'),
      { user, link },
      { async: true },
    );
    const transport = await generateTransport();
    const mailRes = await transport.sendMail({
      from: 'splttr@mechninja.com',
      to: user.email,
      subject: 'Your Splttr Magic Link',
      html: emailBody,
    });

    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.log(`Magic Link Request Preview URL: ${nodemailer.getTestMessageUrl(mailRes)}`);
    }
    return true;
  },
  loginWithToken: async (parent, args, ctx) => {
    const { loginToken } = args;
    const user = await ctx.db.user({ loginToken });
    if (
      !user
      || user.loginTokenExpiry < Date.now()
    ) {
      return null;
    }
    // Invalidate the login token.
    await ctx.db.updateUser({
      where: { id: user.id },
      data: {
        loginToken: null,
        loginTokenExpiry: null,
      },
    });
    const browserToken = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
    ctx.response.cookie('token', browserToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365,
    });
    return user;
  },
  logout: (parent, args, ctx) => {
    ctx.response.clearCookie('token');
    return true;
  },
  createUser: async (parent, args, ctx) => {
    const email = args.email.toLowerCase();

    return ctx.db.createUser({
      name: args.name,
      email,
    });
  },
};

export default Mutation;
