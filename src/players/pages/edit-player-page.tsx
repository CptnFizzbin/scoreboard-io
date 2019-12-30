import {Card, CardContent, Grid} from '@material-ui/core';
import {push} from 'connected-react-router';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router';

import PageTitle from '../../common/page-title';
import {RootState} from '../../store/root-reducer';
import Player, {NullPlayer} from '../player';
import PlayerForm from '../player-form';
import {UpdatePlayer} from '../player.actions';

const EditPlayerPage:React.FC = () => {
  const dispatch = useDispatch();
  const {id = ''} = useParams();
  const player = useSelector((state:RootState):Player => state.players[parseInt(id)] || NullPlayer);

  const onFormSave = (player:Player) => {
    dispatch(UpdatePlayer(player));
    dispatch(push('/players'));
  };

  if (player.isNull) {
    return (<div>404 Not found</div>);
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <PageTitle>Edit {player.name}</PageTitle>
      </Grid>

      <Grid item xs={12}>
        <Card>
          <CardContent>
            <PlayerForm player={player} onSave={onFormSave} />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};


export default EditPlayerPage;
