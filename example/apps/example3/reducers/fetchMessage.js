// Created by Pysics on 2017.5.8

'use strict'

import * as types from '../actions/actionTypes'

const initialState = {
  hasMessage: false,
  data: null,
  error: false
}

export default function fetchMessage(state=initialState, action) {
  // console.log('------------------------');
  // console.log(action);
  
  switch (action.type) {
    case types.FETCH_MESSAGE_REQUEST:
      return Object.assign({}, state, {
        ...state,
        hasMessage: false,
        error: false
      })
    
    case types.FETCH_MESSAGE_SUCCESS:
      return Object.assign({}, state, {
        ...state,
        hasMessage: true,
        data: action.data,
        error: false
      })
    
    case types.FETCH_MESSAGE_FAILURE:
      return Object.assign({}, state, {
        ...state,
        hasMessage: false,
        error: true
      })
  
    default:
      return state;
  }
}