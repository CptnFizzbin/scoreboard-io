import {RootState} from '../store/root-reducer';
import Player, {NullPlayer} from './player';

const all = () => (state:RootState):Array<Player> => {
  return state.players.filter((player:Player) => Boolean(player));
};

const byId = (playerId:number) => (state:RootState):Player => {
  const player = state.players
    .find((player:Player) => player.id === playerId);
  return player || NullPlayer;
};

const PlayerSelectors = {
  all,
  byId,
};

export default PlayerSelectors;
