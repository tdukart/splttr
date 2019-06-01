import { UserResolvers } from '../../generated/resolvers';
// eslint-disable-next-line import/no-cycle
import { TypeMap } from './types/TypeMap';

export interface UserParent {
  id: string;
  name: string;
  email: string;
  loginToken?: string;
  loginTokenExpiry?: number;
}

const User: UserResolvers.Type<TypeMap> = {
  id: parent => parent.id,
  name: parent => parent.name,
  email: parent => parent.email,
  loginToken: parent => parent.loginToken,
  loginTokenExpiry: parent => parent.loginTokenExpiry,
};

export default User;
