'use strict'

// Redux
import { applyMiddleware, combineReducers, createStore } from 'redux'
import logger from 'redux-logger'

import createSagaMiddleware from 'redux-saga'

import rootSaga from '../sagas/index'

// create the saga middleware
const sagaMiddleware = createSagaMiddleware()

// Navigation
import Nav from '../index/nav'

import ETCDataState from '../reducers/ETCDataState'
import LoginAuth from '../reducers/loginAuth'
import FetchMessage from '../reducers/fetchMessage'


// Middleware
// const middleware = () => {
//   return applyMiddleware(logger)
// }

const store = createStore(
  combineReducers({
    // 使用抽屉导航时返回一个state
    nav: (state,action) => Nav.router.getStateForAction(action, state) || state,
    ETCDataState,
    LoginAuth,
    FetchMessage
  }),
  applyMiddleware(sagaMiddleware, logger)
)

sagaMiddleware.run(rootSaga)

export default store;
