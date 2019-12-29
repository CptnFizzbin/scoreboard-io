import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router';

import PlayerForm from '../components/player-form';
import Player from '../player';
import {UpdatePlayer} from '../player.actions';
import PlayerSelectors from '../player.selectors';

const EditPage:React.FC = () => {
  const dispatch = useDispatch();
  const {id = ''} = useParams();
  const player:Player = useSelector(PlayerSelectors.byId(parseInt(id)));

  const onFormSave = (player:Player) => dispatch(UpdatePlayer(player));

  if (player.isNull) {
    return (<div>404 Not found</div>);
  }

  return (
    <div>
      Edit Page for {player.name}
      <PlayerForm player={player} onSave={onFormSave} />
    </div>
  );
};


export default EditPage;
