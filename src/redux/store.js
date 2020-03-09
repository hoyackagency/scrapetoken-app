// @flow
import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "redux-devtools-extension";
import { createLogger } from "redux-logger";
import reducers from "./reducers";
import sagas from "./sagas";

const sagaMiddleware = createSagaMiddleware();
const loggerMiddleware = createLogger();

const middlewares = [sagaMiddleware, loggerMiddleware];

export function configureStore(initialState = {}) {
  // const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  // const store = createStore(reducers, initialState, composeEnhancers(applyMiddleware(...middlewares)));
  const middlewareEnhancer = composeWithDevTools(
    applyMiddleware(...middlewares)
  );
  const enhancers = [middlewareEnhancer];
  const composedEnhancers = compose(...enhancers);

  const store = createStore(reducers, initialState, composedEnhancers);
  sagaMiddleware.run(sagas);
  return store;
}
