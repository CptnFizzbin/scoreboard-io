import {FormControlLabel, Grid, Switch} from '@material-ui/core';
import React from 'react';
import {useDispatch} from 'react-redux';
import Player from '../players/player';
import {useGameSettings, usePlayers} from '../store/state';
import {SetDealer, UpdateSetting} from './game.actions';

const GameSettings:React.FC = () => {
  const dispatch = useDispatch();
  const useDealer = useGameSettings((state) => state.useDealer);
  const firstPlayer = usePlayers<Player | undefined>((state) => Object.values(state)[0]);

  const toggleUseDealer = () => {
    const newValue = !useDealer;

    dispatch(UpdateSetting({
      useDealer: newValue,
    }));

    if (newValue) {
      dispatch(SetDealer(firstPlayer?.id));
    }
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <FormControlLabel label="Use Dealer" control={
          <Switch checked={useDealer} onChange={toggleUseDealer} />
        } />
      </Grid>
    </Grid>
  );
};

export default GameSettings;
