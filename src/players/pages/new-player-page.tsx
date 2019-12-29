import {Card, CardContent, Grid} from '@material-ui/core';
import {push} from 'connected-react-router';
import React from 'react';
import {useDispatch} from 'react-redux';

import PageTitle from '../../common/page-title';
import PlayerForm from '../player-form';
import Player from '../player';
import {NewPlayer} from '../player.actions';

const NewPlayerPage:React.FC = () => {
  const dispatch = useDispatch();
  const onFormSave = (player:Player) => {
    dispatch(NewPlayer(player));
    dispatch(push('/players'));
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <PageTitle>Add Player</PageTitle>
      </Grid>

      <Grid item xs={12}>
        <Card>
          <CardContent>
            <PlayerForm onSave={onFormSave} />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};


export default NewPlayerPage;
