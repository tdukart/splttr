import * as dotenv from 'dotenv';
import { GraphQLServer } from 'graphql-yoga';
import * as cookieParser from 'cookie-parser';
import * as webpackMiddleware from 'webpack-dev-middleware';
import * as historyApiFallback from 'connect-history-api-fallback';
import * as webpack from 'webpack';
import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { pick, toNumber } from 'lodash';
import resolvers from './api/resolvers';
import { prisma } from './generated/prisma-client';
import { UserParent } from './api/resolvers/User';
import webpackConfig from '../webpack.config';

dotenv.config({ path: 'variables.env' });

const port = process.env.FRONTEND_PORT || 8000;
const mode = (process.env.NODE_ENV === 'developement') ? 'development' : 'production';

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

const middlewareInstance = webpackMiddleware(webpack([webpackConfig(mode)]));
server.express.use(middlewareInstance);
server.express.use(historyApiFallback());
server.express.use(middlewareInstance);

server.start(
  {
    port: toNumber(port),
    playground: process.env.NODE_ENV === 'development',
    endpoint: '/graphql',
  },
  // eslint-disable-next-line no-console
  () => console.log(`Server is running on localhost:${port}`),
);
