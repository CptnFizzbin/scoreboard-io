import {Fab, Grid} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import {push} from 'connected-react-router';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import PageTitle from '../../../common/page-title';
import {RootState} from '../../../store/root-reducer';
import PlayersList from './players-list';

const IndexPage:React.FC = () => {
  const dispatch = useDispatch();
  const players = useSelector((state:RootState) => state.players);
  const onAddButtonClick = () => dispatch(push('/players/new'));

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <PageTitle>Players</PageTitle>
      </Grid>

      <Grid item xs={12}>
        <PlayersList players={players} />
      </Grid>

      <Fab color={'primary'} onClick={onAddButtonClick}>
        <AddIcon />
      </Fab>
    </Grid>
  );
};

export default IndexPage;
