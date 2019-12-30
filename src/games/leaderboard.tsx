import {Paper} from '@material-ui/core';
import React from 'react';
import {useSelector} from 'react-redux';

import Player from '../players/player';
import {RootState} from '../store/root-reducer';

import './leaderboard.scss';

function groupPlayersByScore(players:Player[]):({ score:number, players:Player[] })[] {
  let playersByScore:{
    [score:number]:Player[]
  } = {};

  players.reduce((scores, player) => {
    if (!scores[player.score]) scores[player.score] = [];
    scores[player.score].push(player);
    return scores;
  }, playersByScore);

  return Object.entries(playersByScore)
    .map(([score, players]) => ({
      score: parseInt(score),
      players,
    }))
    .sort((a, b) => {
      if (a.score > b.score) return -1;
      if (a.score === b.score) return 0;
      return 1;
    });
}

function placeName(place:number) {
  if (place % 10 === 1) return `${place}st`;
  if (place % 10 === 2) return `${place}nd`;
  if (place % 10 === 3) return `${place}rd`;
  if (place % 10 >= 4) return `${place}th`;
  return place;
}

const LeaderBoard:React.FC = () => {
  const players = Object.values(useSelector((state:RootState) => state.players));
  const playersByScore = groupPlayersByScore(players);

  return (
    <Paper className={'leaderboard'}>
      {playersByScore.map(({score, players}, index) => (
        <Placement key={score} place={index + 1} score={score} players={players} />
      ))}
    </Paper>
  );
};

interface PlacementProps {
  place:number,
  score:number,
  players:Player[],
}

const Placement:React.FC<PlacementProps> = ({place, score, players}) => {
  return (
    <div className={'placement'}>
      <span className={'label'}>
        <span className={`place place-${place}`}>
          {placeName(place)}
        </span>
        <span className={`score`}>
          {score}
        </span>
      </span>
      <span className={'players'}>
        {players.map((player) => player.name).join(', ')}
      </span>
    </div>
  );
};

export default LeaderBoard;
