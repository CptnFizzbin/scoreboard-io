import React from 'react';
import {Route, Switch, useRouteMatch} from 'react-router';
import EditPage from './edit-page/edit-page';
import IndexPage from './index-page/index-page';

const PlayerPages:React.FC = () => {
  let { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={`${path}/edit/:id`}>
        <EditPage />
      </Route>
      <Route exact path={path}>
        <IndexPage />
      </Route>
    </Switch>
  );
};

export default PlayerPages;
