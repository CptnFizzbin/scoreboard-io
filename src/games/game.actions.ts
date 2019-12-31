export const GameActionTypes = {
  REMATCH: 'GAME.REMATCH',
  END_ROUND: 'GAME.END_ROUND',
  SET_DEALER: 'GAME.SET_DEALER',
};

export interface GameAction {
  type:string;
  dealerId?:number;
}

export function Rematch(dealerId:number):GameAction {
  return {
    type: GameActionTypes.REMATCH,
    dealerId,
  };
}

export function EndRound(dealerId:number):GameAction {
  return {
    type: GameActionTypes.END_ROUND,
    dealerId,
  };
}

export function SetDealer(dealerId:number):GameAction {
  return {
    type: GameActionTypes.SET_DEALER,
    dealerId,
  };
}

