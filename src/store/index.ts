import {routerMiddleware} from 'connected-react-router';
import {createBrowserHistory} from 'history';
import {applyMiddleware, compose, createStore} from 'redux';
import {persistReducer, persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import RootReducer from './root-reducer';

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistConfig = {
  key: 'root',
  blacklist: ['router'],
  storage,
};

export const history = createBrowserHistory();
export const store = createStore(
  persistReducer(
    persistConfig,
    RootReducer(history),
  ),
  composeEnhancers(
    applyMiddleware(
      routerMiddleware(history),
    ),
  ),
);
export const persistor = persistStore(store);
