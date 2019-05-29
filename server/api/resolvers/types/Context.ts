import { Prisma } from '../../../generated/prisma-client'
import { ContextParameters } from 'graphql-yoga/dist/types';

// eslint-disable-next-line import/prefer-default-export
export interface Context extends ContextParameters {
  db: Prisma;
}
