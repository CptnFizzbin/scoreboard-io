import {FormControlLabel, Grid, Switch} from '@material-ui/core';
import React from 'react';
import PageTitle from '../common/page-title';

const GameSettings:React.FC = () => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <PageTitle>Settings</PageTitle>
      </Grid>
      <Grid item xs={12}>
        <FormControlLabel
          control={<Switch checked={checked} onChange={toggleChecked} />}
          label="Normal"
        />
      </Grid>
    </Grid>
  );
};

export default GameSettings;
