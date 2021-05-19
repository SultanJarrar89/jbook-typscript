import { ActionType } from '../actions-types';
import { Action } from '../actions';
import { Cell } from '../cell';
import { stat } from 'node:fs';

export interface CellState {
  loading: boolean;
  error: string | null;
  order: string[];
  data: {
    [key: string]: Cell;
  };
}

const initialState: CellState = {
  loading: false,
  error: null,
  order: [],
  data: {},
};

const reducer = (
  state: CellState = initialState,
  action: Action
): CellState => {
  return state;
};

export default reducer;
