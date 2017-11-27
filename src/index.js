import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import App from './App'
import { Provider } from 'react-redux'
import rootReducer from './reducers'
import logger from 'redux-logger'

let store = createStore(rootReducer, applyMiddleware(logger));

render (
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
