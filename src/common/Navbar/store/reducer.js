import * as actionType from './actiontype'

const defaultState = {
  defaultKey: []
}

export default (state = defaultState, action) => {
  switch(action.type) {
    case actionType.HANDLE_DEFAULTKEY_CHANGE: {
      const newState = JSON.parse(JSON.stringify(state))
      newState.defaultKey = action.key
      return newState
    }
    default:
    return state
  }
}