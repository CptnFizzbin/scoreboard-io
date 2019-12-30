import {Grid, Paper} from '@material-ui/core';
import React from 'react';
import {useSelector} from 'react-redux';
import Player from '../players/player';
import {PlayersState} from '../players/player.reducer';
import {PointsState} from '../points/points.reducer';
import {RootState} from '../store/root-reducer';

import './leaderboard.scss';

interface IdsByPoints {
  [points:number]:Player[],
}

function groupByPoints(points:PointsState, players:PlayersState, pointsName:string):IdsByPoints {
  const idsByPoints:IdsByPoints = {};

  return Object.values(players)
    .reduce((playersByPoints, player) => {
      const value:number = points[player.id]?.[pointsName] || 0;

      if (!playersByPoints[value]) {
        playersByPoints[value] = [];
      }
      playersByPoints[value].push(player);

      return playersByPoints;
    }, idsByPoints);
}

function placeName(place:number) {
  if (place % 10 === 1) return `${place}st`;
  if (place % 10 === 2) return `${place}nd`;
  if (place % 10 === 3) return `${place}rd`;
  if (place % 10 >= 4) return `${place}th`;
  return place;
}

function placementSize(placements:number):12 | 6 | 4 {
  switch (placements) {
    case 1:
      return 12;
    case 2:
      return 6;
    case 3:
      return 4;
    default:
      return 4;
  }
}

const LeaderBoard:React.FC = () => {
  const points = useSelector((state:RootState) => state.points);
  const players = useSelector((state:RootState) => state.players);

  const playersByScore = Object.entries(groupByPoints(points, players, 'score'))
    .map(([score, players]) => {
      return [parseInt(score), players];
    })
    .sort(([pointsA], [pointsB]) => pointsB - pointsA)
    .slice(0, 3);

  return (
    <Grid container spacing={1} className={'leaderboard'}>
      {playersByScore.map(([score, players], index) => (
        <Grid key={score} item xs={12} sm={placementSize(playersByScore.length)}>
          <Placement place={index + 1} score={score} players={players} />
        </Grid>
      ))}
    </Grid>
  );
};

interface PlacementProps {
  place:number,
  score:number,
  players:Player[],
}

const Placement:React.FC<PlacementProps> = ({place, score, players}) => {
  return (
    <Paper className={'placement'}>
      <div className={'label'}>
        <span className={`place place-${place}`}>
          {placeName(place)}
        </span>
        <span className={`score`}>
          {score}
        </span>
      </div>

      <div className={'players'}>
        {players.map((player) => player.name).join(', ')}
      </div>
    </Paper>
  );
};

export default LeaderBoard;
