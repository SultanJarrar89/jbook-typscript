import { combineReducers } from 'redux';
import bundlesReducer from './bundleReducer';

import cellsReducer from './cellReducer';

const reducers = combineReducers({
  cells: cellsReducer,
  bundles: bundlesReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
