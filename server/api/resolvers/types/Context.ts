import { ContextParameters } from 'graphql-yoga/dist/types';
import { Prisma } from '../../../generated/prisma-client';

// eslint-disable-next-line import/prefer-default-export
export interface Context extends ContextParameters {
  db: Prisma;
  request: ContextParameters['request'] & { userId?: string };
}
