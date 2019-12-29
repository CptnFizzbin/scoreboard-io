import {createMuiTheme, CssBaseline, ThemeProvider} from '@material-ui/core';
import {cyan, teal} from '@material-ui/core/colors';
import {ConnectedRouter} from 'connected-react-router';
import React from 'react';
import {Provider} from 'react-redux';

import {Route, Switch} from 'react-router-dom';
import './App.scss';
import {Header} from './header';
import PlayerPages from './players/player-pages';
import configureStore, {history} from './store';

const store = configureStore();
const theme = createMuiTheme({
  palette: {
    primary: cyan,
    secondary: teal,
  },
});

const App:React.FC = () => {
  return (
    <Provider store={store}>
      <CssBaseline />

      <ThemeProvider theme={theme}>
        <ConnectedRouter history={history}>
          <div className="app">
            <Header />

            <main>
              <Switch>
                <Route path="/players">
                  <PlayerPages />
                </Route>
                <Route path="/">
                  <div>Current Game</div>
                </Route>
              </Switch>
            </main>
          </div>
        </ConnectedRouter>
      </ThemeProvider>
    </Provider>
  )
    ;
};

export default App;
