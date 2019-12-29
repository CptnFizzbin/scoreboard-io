import {Grid} from '@material-ui/core';
import React from 'react';
import PageTitle from '../../common/page-title';

const CurrentGamePage:React.FC = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <PageTitle>Current Game</PageTitle>
      </Grid>
    </Grid>
  );
};

export default CurrentGamePage;
