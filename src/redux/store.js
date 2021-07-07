import { applyMiddleware, createStore, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from '../reducer/rootReducer';

const middleware = [thunk];

  const store = createStore(
    rootReducer,
    {},
    compose(
      applyMiddleware(...middleware),
      (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()) ||
        compose
    )
  );

export default store;