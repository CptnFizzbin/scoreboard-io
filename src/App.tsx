import {createMuiTheme, CssBaseline, ThemeProvider} from '@material-ui/core';
import {cyan, teal} from '@material-ui/core/colors';
import React from 'react';
import {Provider} from 'react-redux';

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.scss';
import {Header} from './header';
import {PlayersPage} from './players/players-page';
import configureStore from './store';

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
        <Router>
          <div className="app">
            <Header/>

            <main>
              <Switch>
                <Route path="/players" component={PlayersPage} />
                <Route path="/">
                  <div>Current Game</div>
                </Route>
              </Switch>
            </main>
          </div>
        </Router>
      </ThemeProvider>
    </Provider>
  )
    ;
};

export default App;
