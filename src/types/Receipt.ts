export interface TaxRate {
  id: string;
  name: string;
  amount: number;
}

export enum DiscountType {
  AMOUNT = 'amount',
  PERCENT = 'percent',
}

export interface Discount {
  id: string;
  name: string;
  amount: number;
  type: DiscountType;
}

export interface Person {
  id: string;
  name: string;
}

export interface Item {
  id: string;
  name: string;
  buyers: Person[];
  cost: number;
  taxRate: TaxRate;
  discounts: Discount[];
}

export interface Receipt {
  id: string;
  participants: Person[];
  discounts: Discount[];
  taxRates: TaxRate[];
  items: Item[];
}
