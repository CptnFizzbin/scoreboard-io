import {RootState} from '../store/root-reducer';
import Player, {NullPlayer} from './player';

const all = () => (state:RootState):Array<Player> => {
  return Object.values(state.players);
};

const byId = (playerId:number) => (state:RootState):Player => {
  return state.players[playerId] || NullPlayer;
};

const PlayerSelectors = {
  all,
  byId,
};

export default PlayerSelectors;
