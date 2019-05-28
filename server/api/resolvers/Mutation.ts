import bcrypt from 'bcryptjs';
import { MutationResolvers } from '../../generated/resolvers';
// eslint-disable-next-line import/no-cycle
import { TypeMap } from './types/TypeMap';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface MutationParent {
}

const Mutation: MutationResolvers.Type<TypeMap> = {
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
