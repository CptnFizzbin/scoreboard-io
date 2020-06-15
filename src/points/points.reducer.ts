import {AnyAction} from 'redux';
import {GameActionTypes} from '../games/game.actions';
import {PointsState} from '../store/state';
import {PointsActionTypes} from './points.actions';

const initialState:PointsState = {};

export default function PointsReducer(state = initialState, action:AnyAction) {
  switch (action.type) {
    case GameActionTypes.REMATCH:
      return initialState;
    case GameActionTypes.END_ROUND:
      Object.entries(state).forEach(([playerId, scores]) => {
        state = {
          ...state,
          [playerId]: {
            ...scores,
            bid: 0,
          }
        }
      });
      return state;
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
