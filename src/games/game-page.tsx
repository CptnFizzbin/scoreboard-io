import {Divider, Fab, Grid} from '@material-ui/core';
import NextRoundIcon from '@material-ui/icons/NavigateNext';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import PageTitle from '../common/page-title';
import {RootState} from '../store/root-reducer';
import {EndRound} from './game.actions';
import LeaderBoard from './leaderboard';
import PlayerScoreCard from './player-score-card';

const GamePage:React.FC = () => {
  const dispatch = useDispatch();
  const players = useSelector((state:RootState) => state.players);
  const round = useSelector((state:RootState) => state.game.round);
  const dealerId = useSelector((state:RootState) => state.game.dealerId);

  const onEndRound = () => {
    let playerIds = Object.values(players);
    let currentDealerIndex = playerIds.findIndex((p) => p.id === dealerId);
    let nextDealer = playerIds[currentDealerIndex + 1] || playerIds[0];
    dispatch(EndRound(nextDealer.id));
  };

  return (
    <Grid container spacing={2} className={'page-with-fab'}>
      <Grid item xs={12}>
        <PageTitle>Round {round}</PageTitle>
      </Grid>

      <Grid item xs={12}>
        <LeaderBoard />
      </Grid>

      <Grid item xs={12}>
        <Divider />
      </Grid>

      {Object.values(players).map((player) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={player.id}>
          <PlayerScoreCard player={player} isDealer={player.id === dealerId} />
        </Grid>
      ))}

      <Fab color={'secondary'} variant="extended" onClick={onEndRound}>
        End Round
        <NextRoundIcon />
      </Fab>
    </Grid>
  );
};

export default GamePage;
