import { combineReducers } from 'redux';

import * as receiptActions from './receipt/actions';
import receiptReducer from './receipt/reducer';

export const actions = {
  ...receiptActions,
};

const rootReducer = combineReducers({
  receipts: receiptReducer,
});

export type AppState = ReturnType<typeof rootReducer>;
export default rootReducer;
