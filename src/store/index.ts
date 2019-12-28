import {createStore} from 'redux';
import {rootReducer} from './root-reducer';

export default function configureStore(preloadedState = {}) {
  return createStore(rootReducer, preloadedState);
}
