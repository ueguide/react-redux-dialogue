import React from 'react'
import ReactDOM from 'react-dom'
import { combineReducers, createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { Provider } from 'react-redux'
import { reducer as dialogueReducer, config, FlashAlert } from '../src/index'

config.customParamMessages = {
  test_flash: [
    'warning',
    'Test warning message'
  ]
}

// create store with auth reducer and thunkMiddleware
const store = createStore(
  combineReducers({
    dialogue: dialogueReducer
  }),
  compose(
    applyMiddleware( thunkMiddleware ),
    window.devToolsExtension ? window.devToolsExtension() : f => { return f }
  )
)

ReactDOM.render(
  <Provider store={store}>
    <div>
      <FlashAlert />
      <div className="container">
        <h1>{'React-Redux-Dialogue Bootstrap Starter Template'}</h1>
      </div>
    </div>
  </Provider>,
  document.getElementById( 'app' )
)