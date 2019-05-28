import { QueryResolvers } from '../../generated/resolvers';
// eslint-disable-next-line import/no-cycle
import { TypeMap } from './types/TypeMap';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface QueryParent {
}

const Query: QueryResolvers.Type<TypeMap> = {
  user: (parent, args, ctx) => ctx.db.user({ email: args.email }),
};

export default Query;