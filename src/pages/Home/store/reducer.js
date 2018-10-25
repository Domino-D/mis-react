import * as actionType from './actiontype'

const defaultState = {
  authority: 0
}

const copyState = (state) => (
  JSON.parse(JSON.stringify(state))
)

export default (state = defaultState, action) => {
  switch (action.type) {
    case actionType.HANDLE_AUTHORITY: {
      const newState = copyState(state)
      newState.authority = action.authority
      return newState
    }
    default:
      return state
  }
}