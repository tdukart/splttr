import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { promisify } from 'util';
import { randomBytes } from 'crypto';
import { transport, makeANiceEmail } from '../../mail';
import { MutationResolvers } from '../../generated/resolvers';
// eslint-disable-next-line import/no-cycle
import { TypeMap } from './types/TypeMap';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface MutationParent {
}

const Mutation: MutationResolvers.Type<TypeMap> = {
  login: async (parent, args, ctx) => {
    const email = args.email.toLowerCase();
    const user = await ctx.db.user({ email });
    if (!user) {
      throw new Error(`No such user found for email ${email}`);
    }
    const validPassword = await bcrypt.compare(args.password, user.password);
    if (!validPassword) {
      throw new Error('Invalid password');
    }
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
    ctx.response.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365,
    });
    return user;
  },
  logout: (parent, args, ctx) => {
    ctx.response.clearCookie('token');
    return true;
  },
  requestReset: async (parent, args, ctx) => {
    // 1. Check if this is a real user
    const email = args.email.toLowerCase();
    const user = await ctx.db.user({ email });
    if (!user) {
      throw new Error(`No such user found for email ${email}`);
    }
    // 2. Set a reset token and expiry on that user
    const randomBytesPromiseified = promisify(randomBytes);
    const resetToken = (await randomBytesPromiseified(20)).toString('hex');
    const resetTokenExpiry = Date.now() + (60 * 60 * 1000); // 1 hour from now
    const res = await ctx.db.updateUser({
      where: { email },
      data: { resetToken, resetTokenExpiry },
    });
    const mailRes = await transport.sendMail({
      from: 'splttr@mechninja.com',
      to: user.email,
      subject: 'Your Splttr Password Reset Token',
      html: makeANiceEmail(
        `Your Splttr password reset token is here!
        \n\n
        <a href="${process.env.FRONTEND_URL}/reset?resetToken=${resetToken}">Click here to reset
        your password.</a>`,
      ),
    });
    return true;
  },
  resetPassword: async (parent, args, ctx, info) => {
    if (args.password !== args.confirmPassword) {
      throw new Error('Passwords don\'t match!');
    }
    const [user] = await ctx.db.users({
      where: {
        resetToken: args.resetToken,
        // eslint-disable-next-line @typescript-eslint/camelcase
        resetTokenExpiry_gte: Date.now() - 3600000,
      },
    });
    if (!user) {
      throw new Error('This token is either invalid or expired!');
    }
    const password = await bcrypt.hash(args.password, 10);
    const updatedUser = await ctx.db.updateUser({
      where: { email: user.email },
      data: {
        password,
        resetToken: null,
        resetTokenExpiry: null,
      },
    });
    const token = jwt.sign({ userId: updatedUser.id }, process.env.APP_SECRET);
    ctx.response.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365,
    });
    return updatedUser;
  },
  createUser: async (parent, args, ctx) => {
    const email = args.email.toLowerCase();
    const password = await bcrypt.hash(args.password, 10);

    return ctx.db.createUser({
      name: args.name,
      email,
      password,
    });
  },
};

export default Mutation;
