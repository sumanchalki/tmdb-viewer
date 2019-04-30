import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';
import rootReducer from './reducers';
import App from './components/App';
import {loadState, saveState} from './localStorage';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';
import {fetchGenres} from './actions';

// Add the polyfills.
import "core-js/es5";
import "core-js/es6";
import "core-js/es7";

const initialState = loadState();

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  initialState,
  composeEnhancers(
    applyMiddleware(sagaMiddleware)
  )
);

sagaMiddleware.run(rootSaga);

store.subscribe(() => {
  saveState({
    favorites: store.getState().favorites,
  });
});

store.dispatch(fetchGenres());

ReactDOM.render((
  <Provider store={store}>
    <Router>
      <App/>
    </Router>
  </Provider>
), document.getElementById('root'));
