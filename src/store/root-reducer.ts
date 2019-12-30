import {connectRouter, RouterState} from 'connected-react-router';
import {combineReducers} from 'redux';

import GameReducer, {GameState} from '../games/game.reducer';
import PlayersReducer, {PlayersState} from '../players/player.reducer';

export interface RootState {
  router:RouterState,
  game:GameState,
  players:PlayersState,
}

const rootReducer = (history:any) => combineReducers({
  router: connectRouter(history),

  game: GameReducer,
  players: PlayersReducer,
});

export default rootReducer;
