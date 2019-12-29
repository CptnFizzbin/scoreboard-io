import {Button, Card, CardActions, CardContent} from '@material-ui/core';
import React from 'react';
import {useDispatch} from 'react-redux';

import Player from '../../../players/player';
import {ChangeScore} from '../../../players/player.actions';

import './player-score-card.scss';

interface PlayerScoreCardProps {
  player:Player;
}

const PlayerScoreCard:React.FC<PlayerScoreCardProps> = ({player}) => {
  const dispatch = useDispatch();
  const onScoreChange = (amount:number) => dispatch(ChangeScore(player, amount));

  return (
    <Card className={'player-score-card'}>
      <CardContent>
        {player.name}
      </CardContent>
      <CardActions>
        <Button variant={'outlined'} onClick={() => onScoreChange(-10)}>-10</Button>
        <Button variant={'outlined'} onClick={() => onScoreChange(-1)}>-1</Button>
        <span className={'cur-score'}>{player.score}</span>
        <Button variant={'outlined'} onClick={() => onScoreChange(+1)}>+1</Button>
        <Button variant={'outlined'} onClick={() => onScoreChange(+10)}>+10</Button>
      </CardActions>
    </Card>
  );
};

export default PlayerScoreCard;
