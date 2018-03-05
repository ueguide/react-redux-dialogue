import React from 'react'
import ReactDOM from 'react-dom'
import { combineReducers, createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { Provider } from 'react-redux'
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
import { reducer as dialogueReducer, config, RoutedFlashAlert } from '../src/index'

config.customParamMessages = {
  test_flash: [
    'warning',
    'Test warning message'
  ]
}

const history = createHistory()

// create store with auth reducer and thunkMiddleware
const store = createStore(
  combineReducers({
    dialogue: dialogueReducer,
    router: routerReducer
  }),
  compose(
    applyMiddleware( routerMiddleware( history ), thunkMiddleware ),
    window.devToolsExtension ? window.devToolsExtension() : f => { return f }
  )
)

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        {/* <RoutedFlashAlert render={props => {
          return (
            <div className="alert alert-info">My dang message</div>
          )
        }} /> */}
        <RoutedFlashAlert canClose={false} />
        
        <div className="container">
          <h1>{'React-Redux-Dialogue Bootstrap Starter Template'}</h1>
        </div>
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById( 'app' )
)