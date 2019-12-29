import Player from './player';
import {PlayerAction, PlayerActionTypes} from './player.actions';

export interface PlayersState extends Array<Player> {
}

function nextId(state:PlayersState):number {
  return state.reduce((nextId:number, player:Player) => {
    return player.id > nextId ? player.id : nextId;
  }, 0);
}

const initialState:PlayersState = [
  {id: 0, name: 'Stephen'},
  {id: 1, name: 'David'},
  {id: 2, name: 'Michael'},
];

export default function playersReducer(state = initialState, action:PlayerAction):PlayersState {
  let playerId:number;

  switch (action.type) {
    case PlayerActionTypes.NEW:
      playerId = nextId(state);

      state = [...state];
      state[playerId] = {
        ...action.player,
        id: playerId,
      };

      return state;
    case PlayerActionTypes.UPDATE:
      playerId = action.player.id;

      state = [...state];
      state[playerId] = {
        ...state[playerId],
        ...action.player,
      };

      return state;
    default:
      return state;
  }
};
