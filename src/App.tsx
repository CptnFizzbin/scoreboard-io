import {createMuiTheme, CssBaseline, ThemeProvider} from '@material-ui/core';
import {cyan, teal} from '@material-ui/core/colors';
import {ConnectedRouter} from 'connected-react-router';
import React from 'react';
import {Provider} from 'react-redux';
import {Route, Switch} from 'react-router-dom';
import {PersistGate} from 'redux-persist/integration/react';

import './App.scss';
import {Header} from './header';
import PlayerPages from './players/player-pages';
import {history, persistor, store} from './store';

const theme = createMuiTheme({
  palette: {
    primary: cyan,
    secondary: teal,
  },
});

const AppWrapper:React.FC = ({children}) => {
  return (
    <React.Fragment>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            {children}
          </PersistGate>
        </Provider>
      </ThemeProvider>
    </React.Fragment>
  );
};

const App:React.FC = () => {
  return (
    <AppWrapper>
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
    </AppWrapper>
  );
};

export default App;
