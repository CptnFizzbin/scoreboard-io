import {Button, Grid, TextField} from '@material-ui/core';
import React, {ChangeEvent, FormEvent, useState} from 'react';
import Player, {NullPlayer} from './player';

interface PlayerFormProps {
  player?:Player;

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
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField value={name} onChange={onNameChange} label={'Name'} fullWidth autoFocus />
        </Grid>

        <Grid item xs={12}>
          <Button variant={'contained'} onClick={onFormSubmit}>Save</Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default PlayerForm;
