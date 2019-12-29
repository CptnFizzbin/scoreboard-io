import {connectRouter, RouterState} from 'connected-react-router';
import {combineReducers} from 'redux';

import playersReducer, {PlayersState} from '../players/player.reducer';

export interface RootState {
  players:PlayersState,
  router:RouterState,
}

const rootReducer = (history:any) => combineReducers({
  players: playersReducer,
  router: connectRouter(history),
});

export default rootReducer;
