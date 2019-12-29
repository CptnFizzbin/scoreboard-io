import React from 'react';
import {Route, Switch, useRouteMatch} from 'react-router';
import EditPlayerPage from './pages/edit-player-page';
import PlayersIndexPage from './pages/players-index-page';
import NewPlayerPage from './pages/new-player-page';

const PlayerPages:React.FC = () => {
  let { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={`${path}/new`}>
        <NewPlayerPage />
      </Route>
      <Route exact path={`${path}/:id/edit`}>
        <EditPlayerPage />
      </Route>
      <Route exact path={path}>
        <PlayersIndexPage />
      </Route>
    </Switch>
  );
};

export default PlayerPages;
