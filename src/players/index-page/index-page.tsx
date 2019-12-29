import React from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/root-reducer';

import PlayersList from '../players-list';

const IndexPage:React.FC = () => {
  const players = useSelector((state:RootState) => state.players);

  return (
    <div>
      <h1>Players</h1>
      <PlayersList players={players} />
    </div>
  );
};

export default IndexPage;
