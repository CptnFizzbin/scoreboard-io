import {TextField} from '@material-ui/core';
import React, {ChangeEvent, FormEvent, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router';
import {RootState} from '../../store/root-reducer';
import Player, {NullPlayer} from '../player';
import {UpdatePlayer} from '../player.actions';

const EditPage:React.FC = () => {
  const dispatch = useDispatch();

  const {id} = useParams();
  const player:Player = useSelector((state:RootState) => {
    return state.players.find((player:Player) => player.id.toString() === id) || NullPlayer;
  });

  const onFormSave = (player:Player) => dispatch(UpdatePlayer(player));

  if (player.isNull) {
    return (<div>404 Not found</div>);
  } else {
    return (
      <div>
        Edit Page for {player.name}
        <PlayerForm player={player} onSave={onFormSave} />
      </div>
    );
  }
};

interface PlayerFormProps {
  player:Player;

  onSave(player:Player):void;
}

const PlayerForm:React.FC<PlayerFormProps> = ({player = NullPlayer, onSave}) => {
  const [name, setName] = useState(player.name);

  const onNameChange = (event:ChangeEvent<HTMLInputElement>) => setName(event.currentTarget.value);
  const onFormSubmit = (event:FormEvent) => {
    event.preventDefault();
    onSave({
      ...player,
      name,
    });
  };

  return (
    <form noValidate onSubmit={onFormSubmit}>
      <TextField value={name} onChange={onNameChange} label={'Name'} />
    </form>
  );
};

export default EditPage;
