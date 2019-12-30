import {GameAction, GameActionTypes} from './game.actions';

export interface GameState {
  round:number;
}

const initialState:GameState = {
  round: 1,
};

export default function GameReducer(state = initialState, action:GameAction) {
  switch(action.type) {
    case GameActionTypes.END_ROUND:
      return {
        ...state,
        round: state.round + 1,
      };
    case GameActionTypes.REMATCH:
      return {
        ...state,
        round: 1,
      };
    default:
      return state;
  }
}
