import {Fab, Grid} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import {push} from 'connected-react-router';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import PageTitle from '../../../common/page-title';
import PlayerSelectors from '../../player.selectors';
import PlayersList from './players-list';

const PlayersIndexPage:React.FC = () => {
  const dispatch = useDispatch();
  const players = useSelector(PlayerSelectors.all());
  const onAddButtonClick = () => dispatch(push('/players/new'));

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <PageTitle>Players</PageTitle>
      </Grid>

      <Grid item xs={12}>
        <PlayersList players={players} />
      </Grid>

      <Fab color={'secondary'} onClick={onAddButtonClick}>
        <AddIcon />
      </Fab>
    </Grid>
  );
};

export default PlayersIndexPage;
