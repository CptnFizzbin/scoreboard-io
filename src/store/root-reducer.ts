import {connectRouter, RouterState} from 'connected-react-router';
import {combineReducers} from 'redux';

import GameReducer, {GameState} from '../games/game.reducer';
import PlayersReducer, {PlayersState} from '../players/player.reducer';
import {PointsReducer, PointsState} from '../points/points.reducer';

export interface RootState {
  router:RouterState,
  game:GameState,
  players:PlayersState,
  points:PointsState,
}

const rootReducer = (history:any) => combineReducers({
  router: connectRouter(history),

  game: GameReducer,
  players: PlayersReducer,
  points: PointsReducer,
});

export default rootReducer;
