import Player from './player';
import {PlayerAction, PlayerActionTypes} from './player.actions';

export interface PlayersState extends Array<Player> {
}

function nextId(state:PlayersState):number {
  return state
    .filter((player) => Boolean(player))
    .reduce((nextId, player) => {
      return player.id >= nextId ? player.id + 1 : nextId;
    }, 0);
}

const initialState:PlayersState = [];

export default function playersReducer(state = initialState, action:PlayerAction):PlayersState {
  let playerId:number;

  switch (action.type) {
    case PlayerActionTypes.NEW:
      playerId = nextId(state);

      state = [...state];
      state[playerId] = {
        ...action.player,
        id: playerId,
        score: 0,
        isNull: false,
      };

      return state;
    case PlayerActionTypes.UPDATE:
      playerId = action.player.id;

      state = [...state];
      state[playerId] = {
        ...state[playerId],
        ...action.player,
        isNull: false,
      };

      return state;
    case PlayerActionTypes.DELETE:
      playerId = action.player.id;

      state = [...state];
      delete state[playerId];

      return state;
    default:
      return state;
  }
};
