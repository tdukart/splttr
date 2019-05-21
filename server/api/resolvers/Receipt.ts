import { ReceiptResolvers } from '../../generated/resolvers';
import { TypeMap } from './types/TypeMap';
import { PersonParent } from './Person';
import { DiscountParent } from './Discount';
import { TaxRateParent } from './TaxRate';
import { ItemParent } from './Item';
import { UserParent } from './User';

export interface ReceiptParent {
  id: string;
  user: UserParent;
  date: number;
  store: string;
  participants: PersonParent[];
  discounts: DiscountParent[];
  taxRates: TaxRateParent[];
  items: ItemParent[];
}

const Receipt: ReceiptResolvers.Type<TypeMap> = {
  id: parent => parent.id,
  user: parent => parent.user,
  date: parent => parent.date,
  store: parent => parent.store,
  participants: parent => parent.participants,
  discounts: parent => parent.discounts,
  taxRates: parent => parent.taxRates,
  items: parent => parent.items,
};

export default Receipt;
