import React from 'react';
import {Route, Switch, useRouteMatch} from 'react-router';
import EditPage from './pages/edit-page';
import IndexPage from './pages/index-page';
import NewPage from './pages/new-page';

const PlayerPages:React.FC = () => {
  let { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={`${path}/new`}>
        <NewPage />
      </Route>
      <Route exact path={`${path}/:id/edit`}>
        <EditPage />
      </Route>
      <Route exact path={path}>
        <IndexPage />
      </Route>
    </Switch>
  );
};

export default PlayerPages;
