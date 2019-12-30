export const GameActionTypes = {
  REMATCH: 'GAME.REMATCH',
  END_ROUND: 'GAME.END_ROUND',
};

export interface GameAction {
  type:string;
}

export function Rematch():GameAction {
  return {
    type: GameActionTypes.REMATCH,
  }
}

export function EndRound():GameAction {
  return {
    type: GameActionTypes.END_ROUND,
  }
}

