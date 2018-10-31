import * as actionType from './actiontype'

const defaultState = {
  userList: [],
  newUser: {}
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
    default:
      return state
  }
}