import { RECEIPT_CREATE_REQUEST, RECEIPT_CREATE_SUCCESS, ReceiptActionTypes } from './types';
import { Discount, Item, Person, TaxRate } from '../../types/Receipt';

export const receiptCreateRequest = (): ReceiptActionTypes => ({
  type: RECEIPT_CREATE_REQUEST,
});

export const receiptCreateSuccess = (id: string): ReceiptActionTypes => ({
  type: RECEIPT_CREATE_SUCCESS,
  payload: {
    id,
    participants: [],
    discounts: [],
    taxRates: [],
    items: [],
  },
});
