import Player from './player';

export const PlayerActionTypes = {
  NEW: 'PLAYER.NEW',
  UPDATE: 'PLAYER.UPDATE',
  DELETE: 'PLAYER.DELETE',
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
  };
}

export function DeletePlayer(player:Player):PlayerAction {
  return {
    type: PlayerActionTypes.DELETE,
    player,
  };
}

export function SetScore(player:Player, score:number) {
  return {
    type: PlayerActionTypes.UPDATE,
    player: {
      ...player,
      score,
    },
  };
}

export function SetBid(player:Player, bid:number) {
  return {
    type: PlayerActionTypes.UPDATE,
    player: {
      ...player,
      bid,
    },
  };
}
