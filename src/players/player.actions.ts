import Player from './player';

export const PlayerActionTypes = {
  NEW: 'PLAYER.NEW',
  UPDATE: 'PLAYER.UPDATE',
};

export interface PlayerAction {
  type:string,
  player:any,
}

export function NewPlayer(player:Player):PlayerAction {
  return {
    type: PlayerActionTypes.NEW,
    player,
  };
}

export function UpdatePlayer(player:Player):PlayerAction {
  return {
    type: PlayerActionTypes.UPDATE,
    player,
  }
}
