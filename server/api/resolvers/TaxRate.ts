import { TaxRateResolvers } from '../../generated/resolvers';
import { TypeMap } from './types/TypeMap';

export interface TaxRateParent {
  id: string;
  name: string;
  amount: number;
}

const TaxRate: TaxRateResolvers.Type<TypeMap> = {
  id: parent => parent.id,
  name: parent => parent.name,
  amount: parent => parent.amount,
};

export default TaxRate;
