import { IResolvers } from '../../generated/resolvers';
import { TypeMap } from './types/TypeMap';

import Query from './Query';
import Mutation from './Mutation';
import User from './User';
import TaxRate from './TaxRate';
import Discount from './Discount';
import Item from './Item';
import Person from './Person';
import Receipt from './Receipt';

const resolvers: IResolvers<TypeMap> = {
  Discount,
  Item,
  Person,
  Receipt,
  TaxRate,
  Query,
  Mutation,
  User,
};

export default resolvers;
