import produce from 'immer';
import { RECEIPT_CREATE_SUCCESS, ReceiptActionTypes, ReceiptState } from './types';

const initialState: ReceiptState = {
  receipts: [],
};

const receiptReducer = (state = initialState, action: ReceiptActionTypes): ReceiptState => (
  produce<ReceiptState>(state, draft => {
    if (action.type === RECEIPT_CREATE_SUCCESS) {
      draft.receipts.push(action.payload);
    }
  })
);

export default receiptReducer;
