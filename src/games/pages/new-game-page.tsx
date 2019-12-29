import {Grid} from '@material-ui/core';
import React from 'react';
import PageTitle from '../../common/page-title';

const NewGamePage:React.FC = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <PageTitle>New Game</PageTitle>
      </Grid>
    </Grid>
  );
};

export default NewGamePage;
