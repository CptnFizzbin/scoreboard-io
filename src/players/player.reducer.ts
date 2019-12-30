import Player from './player';
import {PlayerAction, PlayerActionTypes} from './player.actions';

export interface PlayersState {
  [index:number]:Player
}

function nextId(state:PlayersState):number {
  return Object.values(state)
    .reduce((nextId, player) => {
      return player.id >= nextId ? player.id + 1 : nextId;
    }, 0);
}

const initialState:PlayersState = {};

export default function PlayersReducer(state = initialState, action:PlayerAction):PlayersState {
  switch (action.type) {
    case PlayerActionTypes.NEW:
      const playerId = nextId(state);

      return {
        ...state,
        [playerId]: {
          ...action.player,
          id: playerId,
          isNull: false,
        },
      };
    case PlayerActionTypes.UPDATE:
      return {
        ...state,
        [action.player.id]: {
          ...state[action.player.id],
          ...action.player,
          isNull: false,
        },
      };
    case PlayerActionTypes.DELETE:
      state = {...state};
      delete state[action.player.id];

      return state;
    default:
      return state;
  }
};
