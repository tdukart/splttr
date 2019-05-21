import { DiscountResolvers } from '../../generated/resolvers';
import { TypeMap } from './types/TypeMap';
import { DiscountType } from '../../../client/types/Receipt';

export interface DiscountParent {
  id: string;
  name: string;
  amount: number;
  type: DiscountType;
}

const Discount: DiscountResolvers.Type<TypeMap> = {
  id: parent => parent.id,
  name: parent => parent.name,
  amount: parent => parent.amount,
  type: parent => parent.type,
};

export default Discount;
