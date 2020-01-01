import {routerMiddleware} from 'connected-react-router';
import {createBrowserHistory} from 'history';
import {applyMiddleware, compose, createStore} from 'redux';
import {persistReducer, persistStore} from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage';
import configureReducer from './configure-reducer';

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistConfig = {
  key: 'root',
  blacklist: ['router'],
  stateReconciler: autoMergeLevel2,
  storage,
};

export const history = createBrowserHistory();
export const store = createStore(
  persistReducer(
    persistConfig,
    configureReducer(history),
  ),
  composeEnhancers(
    applyMiddleware(
      routerMiddleware(history),
    ),
  ),
);
export const persistor = persistStore(store);
