import { GraphQLServer } from 'graphql-yoga';
// @ts-ignore
import * as cookieParser from 'cookie-parser';
import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
// @ts-ignore
import * as dotenv from 'dotenv';
import resolvers from './resolvers';
import { prisma } from '../generated/prisma-client';
import { UserParent } from './resolvers/User';
import { pick } from 'lodash';

dotenv.config({ path: 'variables.env' });

const server = new GraphQLServer({
  typeDefs: './server/schema.graphql',
  // @ts-ignore
  resolvers,
  context: req => ({ ...req, db: prisma }),
});

server.express.use(cookieParser());

type RequestWithUserData = Request & {
  userId?: string;
  user?: Pick<UserParent, 'id' | 'name' | 'email'>;
}

server.express.use((req: RequestWithUserData, res: Response, next: NextFunction) => {
  const { token } = req.cookies;
  if (token) {
    const { userId } = jwt.verify(token, process.env.APP_SECRET) as { userId: string };
    // @ts-ignore
    req.userId = userId;
  }
  next();
});

server.express.use(async (req: RequestWithUserData, res: Response, next: NextFunction) => {
  // if they aren't logged in, skip this
  if (!req.userId) {
    return next();
  }
  const user = await prisma.user(
    { id: req.userId },
  );
  req.user = pick(user, ['id', 'name', 'email']);
  next();
});

// eslint-disable-next-line no-console
server.start(() => console.log('Server is running on localhost:4000'));
