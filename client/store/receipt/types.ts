import { Receipt } from '../../types/Receipt';

export interface ReceiptState {
  receipts: Receipt[];
}

export const RECEIPT_CREATE_REQUEST = 'RECEIPT_CREATE_REQUEST';
export const RECEIPT_CREATE_SUCCESS = 'RECEIPT_CREATE_SUCCESS';

export interface ReceiptCreateRequestAction {
  type: typeof RECEIPT_CREATE_REQUEST;
}

export interface ReceiptCreateSuccessAction {
  type: typeof RECEIPT_CREATE_SUCCESS;
  payload: Receipt;
}

export type ReceiptActionTypes = ReceiptCreateRequestAction | ReceiptCreateSuccessAction;
