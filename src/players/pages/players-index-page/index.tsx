import {Button, Grid} from '@material-ui/core';
import {push} from 'connected-react-router';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import PageTitle from '../../../common/page-title';
import State from '../../../store/state';
import PlayersList from './players-list';

const PlayersIndexPage:React.FC = () => {
  const dispatch = useDispatch();
  const players = useSelector((state:State) => state.players);
  const onAddPlayer = () => dispatch(push('/players/new'));

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <PageTitle>Players</PageTitle>
      </Grid>

      <Grid item xs={12}>
        <PlayersList players={Object.values(players)} />
      </Grid>

      <Grid item xs={12}>
        <Button onClick={onAddPlayer} fullWidth variant={'outlined'}>Add Player</Button>
      </Grid>
    </Grid>
  );
};

export default PlayersIndexPage;
