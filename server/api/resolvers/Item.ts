import { ItemResolvers } from '../../generated/resolvers';
import { TypeMap } from './types/TypeMap';
import { PersonParent } from './Person';
import { TaxRateParent } from './TaxRate';

export interface ItemParent {
  id: string;
  name: string;
  buyers: PersonParent[];
  const: number;
  taxRate: TaxRateParent;
}

const Item: ItemResolvers.Type<TypeMap> = {
  id: parent => parent.id,
  name: parent => parent.name,
  buyers: parent => parent.buyers,
  cost: parent => parent.cost,
  taxRate: parent => parent.taxRate,
  discounts: parent => parent.discounts,
};

export default Item;
