import {Button, ButtonGroup, Grid, Paper} from '@material-ui/core';
import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import Player from '../players/player';
import {SetBid, SetScore} from '../players/player.actions';
import {RootState} from '../store/root-reducer';

import './player-score-card.scss';

interface PlayerScoreCardProps {
  player:Player;
  isDealer:boolean;
}

const PlayerScoreCard:React.FC<PlayerScoreCardProps> = ({
  player,
  isDealer,
}) => {
  const dispatch = useDispatch();
  const onScoreChange = (score:number) => dispatch(SetScore(player, score));
  const onBidChange = (bid:number) => dispatch(SetBid(player, bid));

  return (
    <Paper className={'player-score-card'}>
      <Grid container spacing={1}>
        <Grid item xs={12} className={`player-name ${isDealer && 'dealer'}`}>
          {player.name}
        </Grid>

        <Grid item xs={12}>
          <PointsCounter label={'Bid'} name={'bid'} playerId={player.id} onChange={onBidChange} trackDelta={false} />
        </Grid>
        <Grid item xs={12}>
          <PointsCounter label={'Score'} name={'score'} playerId={player.id} onChange={onScoreChange} />
        </Grid>
      </Grid>
    </Paper>
  );
};

interface ScoreControlsProps {
  name:string,
  playerId:number,

  label?:string,
  trackDelta?:boolean,

  onChange(newValue:number):void,
}

const PointsCounter:React.FC<ScoreControlsProps> = ({
  name,
  playerId,

  label = '',
  trackDelta = true,

  onChange,
}) => {
  const [delta, setDelta] = useState(0);
  const [changed, setChanged] = useState(false);

  const points = useSelector((state:RootState):number => state.points?.[playerId]?.[name] || 0);
  const game = useSelector((state:RootState):number => state.game.round);
  const gameRef = useRef(0);

  const onButtonClick = (amount:number) => {
    onChange(points + amount);
    setDelta(delta + amount);
    setChanged(true);
  };

  useEffect(() => {
    if (gameRef.current !== game) {
      gameRef.current = game;
      setDelta(0);
      setChanged(false);
    }
  }, [game]);

  return (
    <div className={'score-controls'}>
      <ButtonGroup>
        <Button
          className={'points-btn'}
          onClick={() => onButtonClick(-10)}
        >-10</Button>
        <Button
          className={'points-btn'}
          onClick={() => onButtonClick(-1)}
        >-1</Button>
      </ButtonGroup>
      <div className={'score-area'}>
        {label && (
          <div className={'label'}>
            {label}
          </div>
        )}
        {trackDelta && changed
          ? (
            <div className={'delta'}>
              {delta > 0 ? `+${delta}` : delta}
            </div>
          )
          : (
            <div className={'score'}>
              {points}
            </div>
          )
        }
      </div>
      <ButtonGroup>
        <Button
          className={'points-btn'}
          onClick={() => onButtonClick(+1)}
        >+1</Button>
        <Button
          className={'points-btn'}
          onClick={() => onButtonClick(+10)}
        >+10</Button>
      </ButtonGroup>
    </div>
  );
};

export default PlayerScoreCard;
