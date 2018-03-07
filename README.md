# react-redux-dialogue

react-redux-dialogue is a react+redux library for displaying simple messages to application users.

Save time writing notification popups and flash alerts with HOC and easy action dispatchers.

## Installation
```
npm install --save react-redux-dialogue
```

## How It Works
This library allows you to dispatch dialogue messages to your application user via redux actions.  Include dialogue components in a Higher Order Component just once to listen for store changes, triggering rendering of desired messages.

## Tutorial
In your app, include dialogue reducer and be sure to apply [redux-thunk](https://github.com/gaearon/redux-thunk) to your store middleware.

Simple example application:
```js
import React from 'react'
import ReactDOM from 'react-dom'
import { combineReducers, createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { Provider } from 'react-redux'
import { reducer as dialogueReducer, FlashAlert, ModalMessage } from 'react-redux-dialogue'

const store = createStore(
  combineReducers({
    dialogue: dialogueReducer
  }),
  compose(
    applyMiddleware( thunkMiddleware )
  )
)

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        {/* 
          Include FlashAlert wherever you want it to render.  In this case we're 
          including it at the top of the app 
        */}
        <FlashAlert />
        <div className="container">
          <h1>My App</h1>
          <div id="content">
            {/* ... */}
          </div>
        </div>
        {/* 
          Include ModalMessage anywhere near the root of your application.  Modal 
          will creat an overlay no matter where it's included, so we're putting it
          at the bottom.
        */}
        <ModalMessage />
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById( 'app' )
)
``` 

To trigger dialogue rendering, simply dispatch one of the actions in the API section below.

## API

#### `setFlashAlert([flag, message])`

Action creator that corresponds to the `FlashAlert` component rendering.

- `flag` - a key string corresponding to a bootstrap alert class `warning|info|success|danger`
- 'message' - a message string for the body of the alert 

**You must provide both `flag` and `message` in an array argument `[flag, message]`**

#### `unsetFlashAlert()`

Action creator to remove any known flash alert

#### `setMessage({title, body})`

Action creator that corresponds to the `ModalMessage` component 

- `title` - an object key/value for the modal title 
- `body` - an object key/value for the modal body (may contain html)

**You must provide an object with both `title` and `body` defined as the argument**

#### `unsetMessage()`

Action creator to remove modal message
