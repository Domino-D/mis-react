import * as actionType from './actiontype'

const defaultState = {
  userList: [],
  newUser: {
    email: '',
    pwd: ''
  },
  errorMsg: ''
}

const copyState = (state) => (
  JSON.parse(JSON.stringify(state))
)

export default (state = defaultState, action) => {
  switch (action.type) {
    case actionType.LOAD_USER_LIST: {
      const newState = copyState(state)
      newState.userList = action.users
      return newState
    }
    case actionType.HANDLE_EMAIL_CHANGE: {
      const newState = copyState(state)
      newState.newUser.email = action.email
      return newState
    }
    case actionType.HANDLE_PASSWORD_CHANGE: {
      const newState = copyState(state)
      newState.newUser.pwd = action.pwd
      return newState
    }
    case actionType.RESET_NEW_ADMIN: {
      const newState = copyState(state)
      newState.newUser = defaultState.newUser
      return newState
    }
    case actionType.SET_ERROR_MSG: {
      const newState = copyState(state)
      newState.errorMsg = action.msg
      return newState
    }
    default:
      return state
  }
}