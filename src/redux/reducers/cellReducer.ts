import { ActionType } from '../actions-types';
import { Action } from '../actions';
import { Cell } from '../cell';
import produce from 'immer';

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

const cellsReducer = produce(
  (state: CellState = initialState, action: Action) => {
    switch (action.type) {
      case ActionType.UPDATE_CELL:
        const { id, content } = action.payload;
        state.data[id].content = content;
        return state;
      case ActionType.DELETE_CELL:
        delete state.data[action.payload];
        state.order = state.order.filter((id) => id !== action.payload);
        return state;
      case ActionType.MOVE_CELL:
        const { direction } = action.payload;
        const idx = state.order.findIndex((id) => id === action.payload.id);
        const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
        if (targetIdx < 0 || targetIdx > state.order.length - 1) return state;
        state.order[idx] = state.order[targetIdx];
        state.order[targetIdx] = action.payload.id;
        return state;
      case ActionType.INSERT_CELL_AFTER:
        const cell: Cell = {
          id: randomId(),
          content: '',
          type: action.payload.celltype,
        };
        state.data[cell.id] = cell;
        const index = state.order.findIndex((id) => id === action.payload.id);
        if (index < 0) {
          state.order.unshift(cell.id);
        } else {
          state.order.splice(index + 1, 0, cell.id);
        }
        return state;
      default:
        return state;
    }
  },
  initialState
);

const randomId = () => Math.random().toString(36).substr(2, 5);

export default cellsReducer;
