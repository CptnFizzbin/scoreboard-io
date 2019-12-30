import {AnyAction} from 'redux';
import {GameActionTypes} from '../games/game.actions';
import {PointsActionTypes} from './points.actions';

export interface PointsState {
  [playerId:number]:{
    [label:string]:number;
  }
}

const initialState:PointsState = {};

export function PointsReducer(state = initialState, action:AnyAction) {
  switch (action.type) {
    case GameActionTypes.REMATCH:
      return initialState;
    case PointsActionTypes.SET:
      return {
        ...state,
        [action.playerId]: {
          ...state[action.playerId],
          [action.label]: action.value,
        }
      };
    default:
      return state;
  }
}
