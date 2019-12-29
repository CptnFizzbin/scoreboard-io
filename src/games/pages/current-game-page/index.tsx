import {Grid} from '@material-ui/core';
import React from 'react';
import {useSelector} from 'react-redux';

import PlayerSelectors from '../../../players/player.selectors';
import PlayerScoreCard from './player-score-card';

const CurrentGamePage:React.FC = () => {
  const players = useSelector(PlayerSelectors.all());

  return (
    <Grid container spacing={1}>
      {players.map((player) => (
        <Grid item xs={12} key={player.id}>
          <PlayerScoreCard player={player} />
        </Grid>
      ))}
    </Grid>
  );
};

export default CurrentGamePage;
