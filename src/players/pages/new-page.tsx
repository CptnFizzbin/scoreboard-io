import {push} from 'connected-react-router';
import React from 'react';
import {useDispatch} from 'react-redux';

import PlayerForm from '../components/player-form';
import Player from '../player';
import {NewPlayer} from '../player.actions';

const NewPage:React.FC = () => {
  const dispatch = useDispatch();
  const onFormSave = (player:Player) => {
    dispatch(NewPlayer(player));
    dispatch(push('/players'));
  };

  return (
    <div>
      Add Player
      <PlayerForm onSave={onFormSave} />
    </div>
  );
};


export default NewPage;
