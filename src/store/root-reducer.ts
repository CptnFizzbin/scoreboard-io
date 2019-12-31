import {connectRouter} from 'connected-react-router';
import {combineReducers} from 'redux';
import GameReducer from '../games/game.reducer';
import PlayersReducer from '../players/player.reducer';
import PointsReducer from '../points/points.reducer';
import State from './state';

export interface RootState extends State {}

const RootReducer = (history:any) => combineReducers({
  router: connectRouter(history),

  game: GameReducer,
  players: PlayersReducer,
  points: PointsReducer,
});

export default RootReducer;
