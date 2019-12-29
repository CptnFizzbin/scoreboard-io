import {Grid, IconButton, Paper} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import {push} from 'connected-react-router';
import React from 'react';
import {useDispatch} from 'react-redux';
import DeleteButton from '../../../common/delete-button';

import Player from '../../player';
import {DeletePlayer} from '../../player.actions';

import './players-list.scss';

interface PlayerListProps {
  players:Player[];
}

const PlayersList:React.FC<PlayerListProps> = ({players}) => {
  return (
    <Grid container spacing={1} className={'players-list'}>
      {players.map((player:Player) => (
        <Grid item xs={12} key={player.id}>
          <PlayerListItem player={player} />
        </Grid>
      ))}
    </Grid>
  );
};

interface PlayerListItemProps {
  player:Player;
}

export const PlayerListItem:React.FC<PlayerListItemProps> = ({player}) => {
  const dispatch = useDispatch();
  const onEdit = () => dispatch(push(`/players/${player.id}/edit`));
  const onDelete = () => {
    dispatch(DeletePlayer(player));
    dispatch(push('/players'));
  };

  return (
    <Paper className={'player'}>
      <IconButton onClick={onEdit}>
        <EditIcon />
      </IconButton>
      <span className={'name'}>
        {player.name}
      </span>
      <DeleteButton onDelete={onDelete} />
    </Paper>
  );
};

export default PlayersList;
