export const GameActionTypes = {
  REMATCH: 'GAME.REMATCH',
};

export interface GameAction {
  type:string;
}

export function Rematch():GameAction {
  return {
    type: GameActionTypes.REMATCH,
  }
}
