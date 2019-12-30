import {Grid, Paper} from '@material-ui/core';
import React from 'react';

const LeaderBoard:React.FC = () => {
  return (
    <Paper>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          Leaderboard
        </Grid>
      </Grid>
    </Paper>
  )
};

export default LeaderBoard;
