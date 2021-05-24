import { ActionType } from '../actions-types';
import produce from 'immer';
import { Action } from '../actions';

export interface BundleState {
  [key: string]: {
    loading: boolean;
    code: string;
    err: string;
  };
}

const initialState: BundleState = {};

const bundleReducer = produce(
  (state: BundleState = initialState, action: Action) => {
    switch (action.type) {
      case ActionType.BUNDLE_START:
        return state;

      case ActionType.BUNDLE_COMPLETE:
        return state;
      default:
        return state;
    }
  }
);
