import * as types from '../actions/actionTypes'

const initialState = {
  isLogin: false,
  loginStatus: '立即登录'
}


export default function isLogin(state=initialState, action) {
  // console.log('------------------------');
  // console.log(action);
  
  switch (action.type) {
    case types.LOGIN_AUTH_REQUEST:
      return Object.assign({}, state, {
        ...state,
        isLogin: false,
        loginStatus: '登陆中。。'
      })
    case types.LOGIN_SUCCESS:
      return Object.assign({}, state, {
        ...state,
        isLogin: true,
        loginStatus: '立即登录'
      })

    case types.LOGIN_FAILURE:
      return Object.assign({}, state, {
        ...state,
        isLogin: false,
        loginStatus: '立即登录'
      })
  
    default:
      return state;
  }
}
