import React from 'react';
import {Route, Switch, useRouteMatch} from 'react-router';
import CurrentGamePage from './pages/current-game-page';
import NewGamePage from './pages/new-game-page';

const GamePages:React.FC = () => {
  let {path} = useRouteMatch();

  return (
    <Switch>
      <Route exact path={`${path}/new`}>
        <NewGamePage />
      </Route>
      <Route exact path={path}>
        <CurrentGamePage />
      </Route>
    </Switch>
  );
};

export default GamePages;
