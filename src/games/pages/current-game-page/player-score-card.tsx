import {Button, ButtonGroup, Grid, Paper} from '@material-ui/core';
import React from 'react';
import {useDispatch} from 'react-redux';

import Player from '../../../players/player';
import {SetScore} from '../../../players/player.actions';

import './player-score-card.scss';

interface PlayerScoreCardProps {
  player:Player;
}

const PlayerScoreCard:React.FC<PlayerScoreCardProps> = ({player}) => {
  const dispatch = useDispatch();
  const onScoreChange = (score:number) => dispatch(SetScore(player, score));

  return (
    <Paper className={'player-score-card'}>
      <Grid container spacing={1}>
        <Grid item xs={12} className={'player-info'}>
          <span className={'player-name'}>
            {player.name}
          </span>
        </Grid>

        <Grid item xs={12}>
          <ScoreControls value={player.score} onChange={onScoreChange} />
        </Grid>
      </Grid>
    </Paper>
  );
};

interface ScoreControlsProps {
  value:number,
  onChange(newValue:number):void,
}

const ScoreControls:React.FC<ScoreControlsProps> = ({value, onChange}) => {
  return (
    <div className={'score-actions'}>
      <ButtonGroup>
        <Button
          variant={'outlined'} className={'score-action-btn'}
          onClick={() => onChange(value - 10)}
        >
          -10
        </Button>
        <Button
          variant={'outlined'} className={'score-action-btn'}
          onClick={() => onChange(value - 1)}
        >
          -1
        </Button>
      </ButtonGroup>
      <span className={'cur-score'}>{value}</span>
      <ButtonGroup>
        <Button
          variant={'outlined'} className={'score-action-btn'}
          onClick={() => onChange(value + 1)}
        >
          +1
        </Button>
        <Button
          variant={'outlined'} className={'score-action-btn'}
          onClick={() => onChange(value + 10)}
        >
          +10
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default PlayerScoreCard;
