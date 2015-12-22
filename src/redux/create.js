// Redux utility functions
import { createStore, applyMiddleware } from 'redux';

// Middleware
import createMiddleware from './middleware/clientMiddleware';

export default function create (reducer) {
  const middleware = createMiddleware(reducer);
  const finalCreateStore = applyMiddleware(middleware)(createStore);

  return finalCreateStore.apply(this, arguments);
}
