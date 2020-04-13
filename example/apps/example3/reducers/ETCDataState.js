// Created by Pysics on 2017.5.3

'use strict'

import * as types from '../actions/actionTypes'

const initialState = {
  loading: false,
  hasData: false,
  error: false,
  data: null,
  fetchTime: null
}

export default function ETCDataState(state=initialState, action) {
  // console.log('------------------------');
  // console.log(action);
  
  switch (action.type) {
    case types.FETCH_ETC_DATA_REQUEST:
      return Object.assign({}, state, {
        ...state,
        loading: true,
        error: false
      })
    
    case types.FETCH_ETC_DATA_SUCCESS:
      return Object.assign({}, state, {
        ...state,
        loading: false,
        hasData: true,
        data: action.data,
        fetchTime: action.fetchTime
      })
    
    case types.FETCH_ETC_DATA_FAILURE:
      return Object.assign({}, state, {
        ...state,
        loading: false,
        error: true
      })
  
    default:
      return state;
  }
}