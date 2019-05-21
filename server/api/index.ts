import { GraphQLServer } from 'graphql-yoga';
import resolvers from './resolvers';
import { prisma } from '../generated/prisma-client';

const server = new GraphQLServer({
  typeDefs: './server/schema.graphql',
  // @ts-ignore
  resolvers,
  context: { db: prisma },
});

// eslint-disable-next-line no-console
server.start(() => console.log('Server is running on localhost:4000'));
