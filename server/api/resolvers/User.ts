import { UserResolvers } from '../../generated/resolvers';
// eslint-disable-next-line import/no-cycle
import { TypeMap } from './types/TypeMap';

export interface UserParent {
  id: string;
  name: string;
  email: string;
  password: string;
  resetToken: string;
  resetTokenExpiry: number;
}

const User: UserResolvers.Type<TypeMap> = {
  id: parent => parent.id,
  name: parent => parent.name,
  email: parent => parent.email,
  password: parent => parent.password,
  resetToken: parent => parent.resetToken,
  resetTokenExpiry: parent => parent.resetTokenExpiry,
};

export default User;
