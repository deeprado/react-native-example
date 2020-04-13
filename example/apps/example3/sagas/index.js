'use strict'

import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'

import * as types from '../actions/actionTypes'
import fetchUrl from '../constants/fetchUrl'


// ============ ETC

function requestData() {
  return {
    type: types.FETCH_ETC_DATA_REQUEST
  }
}

function receiveData(json) {
  return {
    type: types.FETCH_ETC_DATA_SUCCESS,
    data: json,
    // fetchTime: new Data().toLocaleString()
  }
}

function fetchFailure() {
  return {
    type: types.FETCH_ETC_DATA_FAILURE
  }
}

// function fetchUserAPI() {
//   return fetch(fetchUrl)
//   .then(res => (
//     res.json()
//   ))
//   .then(resJson => (
//     resJson
//   ))
//   .catch(err => (
//     err.message
//   ))
//   .done()
// }

// const fetchAPI = {
//   fetchETC (url) {
//     // fetchUrl.etc而不是feychUrl
//     return fetch(url)
//     .then(response => response.json())
//     .then(data => {
//       return data
//      })
//     .catch(error => error)
//   }
// }

// 能运行
function fetchAPI(url) {
  return fetch(url)
  .then(res => (
    res.json()
  ))
  .then(resJson => (
    resJson
  ))
  .catch(err => {
    console.log(err.message);
  })
  // .done()
}


function* fetchUser() {
  try {
    const response = yield call( fetchAPI, fetchUrl.etc );
    // 或者
    // const response = yield call( fetch, fetchUrl );

    yield put( receiveData(response) );
  } catch (error) {
    yield put(fetchFailure());
  }
}


// ============ login
function logining() {
  return {
    type: types.LOGIN_AUTH_REQUEST
  }
}

function loginSuccess() {
  return {
    type: types.LOGIN_SUCCESS
  }
}

function loginFailure() {
  return {
    type: types.LOGIN_FAILURE
  }
}


// function loginRequest() {
//   return {
//     type: types.LOGIN_SUCCESS
//   }
// }


function login(loginData) {
  // 这里已经取到input的值了，然后fetch给后端处理
  // console.log(loginData);
  const data = loginData.loginData.body
  
  // 这里模拟后端验证
  if (data.account !== '123') {
    return 'valid_account'
  } else if (data.password !== 'qwe') {
    return 'valid_password'
  } else {
    // 这里取服务端返回的数据{account: '123', password: 'qwe'}
    return fetch(fetchUrl.login, {method: 'POST'})
    .then(res => res.json())
    .then(resJson => {
      // console.log(resJson);
      return resJson;
    })
  }
}

function* loginAuthTask(loginData) {
    const response = yield call( login, loginData );
    
    // console.log(response);
    // 验证返回的结果
    if (response === 'valid_account') {
      yield put( loginFailure() )
      alert('用户名不合法！')
    } else if (response === 'valid_password') {
      yield put( loginFailure() )
      alert('密码不合法！')
    } else {
      yield put( loginSuccess() );
      
      // 登录成功，则返回
      loginData.loginData.navigation.goBack();
      
    }
}


// ================= fetch message

function requestMessage() {
  return {
    type: types.FETCH_MESSAGE_REQUEST
  }
}

function receiveMessage(json) {
  return {
    type: types.FETCH_MESSAGE_SUCCESS,
    data: json,
    // fetchTime: new Data().toLocaleString()
  }
}

function fetchMessageFailure() {
  return {
    type: types.FETCH_MESSAGE_FAILURE
  }
}

function* fetchMessage() {
  try {
    const response = yield call( fetchAPI, fetchUrl.message );
    yield put( receiveMessage(response) );
  } catch (error) {
    yield put(fetchMessageFailure());
  }
}


export default function* event() {
  // etc
  yield takeEvery(types.FETCH_ETC_DATA_REQUEST, fetchUser);
  // login
  yield takeEvery(types.LOGIN_AUTH_REQUEST, loginAuthTask);
  // message
  yield takeLatest(types.FETCH_MESSAGE_REQUEST, fetchMessage);
}
