export const GameActionTypes = {
  REMATCH: 'GAME.REMATCH',
  END_ROUND: 'GAME.END_ROUND',
  SET_DEALER: 'GAME.SET_DEALER',
  UPDATE_SETTINGS: 'GAME.UPDATE_SETTINGS',
};

export interface GameAction {
  type:string;
  dealerId?:number;
  settings?:GameSettings;
}

interface GameSettings {
  useDealer?:boolean;
}

export function Rematch():GameAction {
  return {
    type: GameActionTypes.REMATCH,
  };
}

export function EndRound():GameAction {
  return {
    type: GameActionTypes.END_ROUND,
  };
}

export function SetDealer(dealerId?:number):GameAction {
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

