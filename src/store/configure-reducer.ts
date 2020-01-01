import {connectRouter} from 'connected-react-router';
import {combineReducers, Reducer} from 'redux';
import GameReducer from '../games/game.reducer';
import PlayersReducer from '../players/player.reducer';
import PointsReducer from '../points/points.reducer';

const configureReducer = (history:any):Reducer => {
  return combineReducers({
    router: connectRouter(history),

    game: GameReducer,
    players: PlayersReducer,
    points: PointsReducer,
  });
};

export default configureReducer;
