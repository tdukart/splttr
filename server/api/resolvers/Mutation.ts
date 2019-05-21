import { MutationResolvers } from '../../generated/resolvers';
// eslint-disable-next-line import/no-cycle
import { TypeMap } from './types/TypeMap';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface MutationParent {
}

const Mutation: MutationResolvers.Type<TypeMap> = {
  createUser: (parent, args, ctx) => ctx.db.createUser({
    name: args.name,
    email: args.email,
  }),
};

export default Mutation;
