import {GameAction, GameActionTypes} from './game.actions';

export interface GameState {
  round:number;
  dealerId:number | null;
}

const initialState:GameState = {
  round: 1,
  dealerId: null,
};

export default function GameReducer(state = initialState, action:GameAction):GameState {
  switch (action.type) {
    case GameActionTypes.END_ROUND:
      return {
        ...state,
        round: state.round + 1,
        dealerId: action.dealerId === undefined ? null : action.dealerId,
      };
    case GameActionTypes.REMATCH:
      return {
        ...state,
        round: 1,
        dealerId: action.dealerId === undefined ? null : action.dealerId,
      };
    case GameActionTypes.SET_DEALER:
      return {
        ...state,
        dealerId: action.dealerId === undefined ? null : action.dealerId,
      };
    default:
      return state;
  }
}
