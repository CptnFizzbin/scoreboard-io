import {RouterState} from 'connected-react-router';
import Player from '../players/player';

export default interface State {
  router:RouterState,

  game:GameState,
  players:PlayersState,
  points:PointsState,
}

export interface PlayersState {
  [index:number]:Player
}

export interface GameState {
  round:number;
  dealerId:number | null;
}

export interface PointsState {
  [playerId:number]:{
    [label:string]:number;
  }
}
