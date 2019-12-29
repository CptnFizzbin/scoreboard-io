import {Fab} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import {push} from 'connected-react-router';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {RootState} from '../../store/root-reducer';
import PlayersList from '../components/players-list';

const IndexPage:React.FC = () => {
  const dispatch = useDispatch();
  const players = useSelector((state:RootState) => state.players);
  const onAddButtonClick = () => dispatch(push('/players/new'));

  return (
    <div>
      <h1>Players</h1>
      <PlayersList players={players} />
      <Fab color={'primary'} onClick={onAddButtonClick}>
        <AddIcon />
      </Fab>
    </div>
  );
};

export default IndexPage;
