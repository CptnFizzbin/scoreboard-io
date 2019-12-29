import {IconButton, Paper} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import {push} from 'connected-react-router';
import React from 'react';
import {useDispatch} from 'react-redux';

import Player from './player';
import {PlayersState} from './player.reducer';

import './players-list.scss';

interface PlayerListProps {
  players:PlayersState;
}

const PlayersList:React.FC<PlayerListProps> = ({players}) => {
  return (
    <div className={'players-list'}>
      {players.map((player:Player) => (
        <PlayerListItem player={player} key={player.id} />
      ))}
    </div>
  );
};

interface PlayerListItemProps {
  player:Player;
}

export const PlayerListItem:React.FC<PlayerListItemProps> = ({player}) => {
  const dispatch = useDispatch();
  const onEditClick = () => dispatch(push(`/players/edit/${player.id}`));

  return (
    <Paper className={'player'}>
      <div className={'name'}>
        <IconButton onClick={onEditClick}>
          <EditIcon fontSize={'small'} />
        </IconButton>
        {player.name}
        ({player.id})
      </div>
    </Paper>
  );
};

export default PlayersList;
