import {Button, Card, CardActions, CardContent} from '@material-ui/core';
import React from 'react';

import Player from '../../../players/player';

import './player-score-card.scss';

interface PlayerScoreCardProps {
  player:Player;
}

const PlayerScoreCard:React.FC<PlayerScoreCardProps> = ({player}) => {
  return (
    <Card className={'player-score-card'}>
      <CardContent>
        {player.name}
      </CardContent>
      <CardActions>
        <Button variant={'outlined'}>-10</Button>
        <Button variant={'outlined'}>-1</Button>
        <span className={'cur-score'}>0</span>
        <Button variant={'outlined'}>+1</Button>
        <Button variant={'outlined'}>+10</Button>
      </CardActions>
    </Card>
  );
};

export default PlayerScoreCard;
