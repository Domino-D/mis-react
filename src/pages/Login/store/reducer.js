import * as actionType from './actiontype'

const defaultState = {
  account: '',
  password: '',
  isLogin: false,
  errormsg: ''
}

const copyState = (state) => (
  JSON.parse(JSON.stringify(state))
)

export default (state = defaultState, action) => {
  switch (action.type) {
    case actionType.HANDLE_ACCOUNT_INPUT: {
      const newState = copyState(state)
      newState.account = action.account
      newState.errormsg = ''
      return newState
    }
    case actionType.HANDLE_PASSWORD_INPUT: {
      const newState = copyState(state)
      newState.password = action.password
      newState.errormsg = ''
      return newState
    }
    case actionType.HANDLE_LOGIN: {
      const newState = copyState(state)
      newState.isLogin = true
      return newState
    }
    case actionType.HANDLE_LOGIN_ERROR: {
      const newState = copyState(state)
      newState.errormsg = 'Invalid Username or Password!'
      newState.password = ''
      return newState
    }
    case actionType.HANDLE_SERVER_ERROR: {
      const newState = JSON.parse(JSON.stringify(state))
      newState.errormsg = 'Connection Error! Please try later.'
      newState.password = ''
      return newState
    }
    case actionType.CLEAR_ERROR: {
      const newState = JSON.parse(JSON.stringify(state))
      newState.errormsg = ''
      return newState
    }
    default:
      return state
  }
}