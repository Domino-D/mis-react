import * as actionType from './actiontype'

const defaultState = {
  newData: {
    original: '',
    material: '',
    description: '',
    vandor: ''
  },
  created: false,
  errorMsg: ''
}

const copyState = (state) => (
  JSON.parse(JSON.stringify(state))
)

export default (state = defaultState, action) => {
  switch (action.type) {
    case actionType.HANDLE_INPUT_ORIGINAL: {
      const newState = copyState(state)
      newState.newData.original = action.text
      return newState
    }
    case actionType.HANDLE_INPUT_MATERIAL: {
      const newState = copyState(state)
      newState.newData.material = action.text
      return newState
    }
    case actionType.HANDLE_INPUT_DESCRIPTION: {
      const newState = copyState(state)
      newState.newData.description = action.text
      return newState
    }
    case actionType.HANDLE_INPUT_VANDOR: {
      const newState = copyState(state)
      newState.newData.vandor = action.text
      return newState
    }
    case actionType.SET_CREATED: {
      const newState = copyState(state)
      newState.created = !newState.created
      return newState
    }
    case actionType.HANDLE_CREATE_ERROR: {
      const newState = copyState(state)
      newState.errorMsg = action.msg
      return newState
    }
    case actionType.RESET_NEW_DATA: {
      const newState = copyState(state)
      newState.newData = defaultState.newData
      return newState
    }
    default:
      return state
  }
}