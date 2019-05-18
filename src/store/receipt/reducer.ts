import { RECEIPT_CREATE_SUCCESS, ReceiptActionTypes, ReceiptState } from 'store/receipt/types';
import produce from 'immer';

const initialState: ReceiptState = {
  receipts: [],
};

const receiptReducer = (state = initialState, action: ReceiptActionTypes): ReceiptState => (
  produce(state, draft => {
    if (action.type === RECEIPT_CREATE_SUCCESS) {
      draft.receipts.push(action.payload);
    }
  })
);

export default receiptReducer;
