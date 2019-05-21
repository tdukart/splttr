/* eslint-disable import/no-cycle,import/prefer-default-export */
import { ITypeMap } from '../../../generated/resolvers';

import { QueryParent } from '../Query';
import { MutationParent } from '../Mutation';
import { UserParent } from '../User';

import { Context } from './Context';
import { ReceiptParent } from '../Receipt';
import { DiscountParent } from '../Discount';
import { PersonParent } from '../Person';
import { TaxRateParent } from '../TaxRate';

export interface TypeMap extends ITypeMap {
  Context: Context;
  QueryParent: QueryParent;
  MutationParent: MutationParent;
  DiscountParent: DiscountParent;
  PersonParent: PersonParent;
  TaxRateParent: TaxRateParent;
  ReceiptParent: ReceiptParent;
  UserParent: UserParent;
}
