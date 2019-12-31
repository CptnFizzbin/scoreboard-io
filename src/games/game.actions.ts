export const GameActionTypes = {
  REMATCH: 'GAME.REMATCH',
  END_ROUND: 'GAME.END_ROUND',
  SET_DEALER: 'GAME.SET_DEALER',
  UPDATE_SETTINGS: 'GAME.UPDATE_SETTINGS',
};

export interface GameSettings {
  dealer?:boolean;
}

export interface GameAction {
  type:string;
  dealerId?:number;
  settings?:GameSettings;
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

export function UpdateSetting(settings:GameSettings):GameAction {
  return {
    type: GameActionTypes.UPDATE_SETTINGS,
    settings,
  };
}

