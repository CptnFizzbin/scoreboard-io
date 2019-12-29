import {RootState} from '../store/root-reducer';
import Player, {NullPlayer} from './player';

const byId = (playerId:number) => (state:RootState) => {
  const player = state.players
    .find((player:Player) => player.id === playerId);
  return player || NullPlayer;
};

const PlayerSelectors = {
  byId,
};

export default PlayerSelectors;
