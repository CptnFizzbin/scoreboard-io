import {Button, ButtonGroup, Grid, Paper} from '@material-ui/core';
import React from 'react';
import {useDispatch} from 'react-redux';

import Player from '../../../players/player';
import {SetBid, SetScore} from '../../../players/player.actions';

import './player-score-card.scss';

interface PlayerScoreCardProps {
  player:Player;
}

const PlayerScoreCard:React.FC<PlayerScoreCardProps> = ({player}) => {
  const dispatch = useDispatch();
  const onScoreChange = (score:number) => dispatch(SetScore(player, score));
  const onBidChange = (bid:number) => dispatch(SetBid(player, bid));

  return (
    <Paper className={'player-score-card'}>
      <Grid container spacing={1}>
        <Grid item xs={12} className={'player-info'}>
          <span className={'player-name'}>
            {player.name}
          </span>
        </Grid>

        <Grid item xs={12}>
          <ScoreControls label={'Bid'} value={player.bid} onChange={onBidChange} />
          <ScoreControls label={'Score'} value={player.score} onChange={onScoreChange} />
        </Grid>
      </Grid>
    </Paper>
  );
};

interface ScoreControlsProps {
  value:number,
  label?:string,

  onChange(newValue:number):void,
}

const ScoreControls:React.FC<ScoreControlsProps> = ({label, value, onChange}) => {
  return (
    <div className={'score-controls'}>
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
      <div className={'score-area'}>
        {label && (
          <div className={'label'}>
            {label}
          </div>
        )}
        <div className={'score'}>
          {value}
        </div>
      </div>
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
