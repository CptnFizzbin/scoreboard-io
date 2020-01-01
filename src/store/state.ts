import {RouterState} from 'connected-react-router';
import {useSelector} from 'react-redux';
import Player from '../players/player';

interface Selector<T> { (state:T):any; }
const defaultSelector = (state:any) => state;

export default interface State {
  router:RouterState,

  game:GameState,
  players:PlayersState,
  points:PointsState,
}

export interface PlayersState {
  [index:number]:Player
}

export function usePlayers<T>(selector:Selector<PlayersState> = defaultSelector):T {
  return useSelector((state:State) => selector(state.players));
}

export interface GameState {
  round:number;
  dealerId:number | null;
  settings:GameSettingsState;
}

export function useGame(selector:Selector<GameState> = defaultSelector) {
  return useSelector((state:State) => selector(state.game));
}

export interface GameSettingsState {
  useDealer:boolean;
}

export function useGameSettings(selector:Selector<GameSettingsState> = defaultSelector) {
  return useSelector((state:State) => selector(state.game.settings));
}

export interface PointsState {
  [playerId:number]:{
    [label:string]:number;
  }
}

export function usePoints(selector:Selector<PointsState> = defaultSelector) {
  return useSelector((state:State) => selector(state.points));
}
