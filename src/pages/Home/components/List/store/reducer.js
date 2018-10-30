import * as actionType from './actiontype'

const defaultState = {
  filteredInfo: null,
  filters: [],
  homeList: [
    {
      key: '1',
      original: 'Original Number',
      material: 'Characteristic Number',
      description: 'Descriptions',
      vandor: 'Manufacturer',
      contributor: 'Who commit this item',
      creation: 'Commit time',
      status: 'Active / Closed'
    }
  ],
  errorMsg: ''
}

const copyState = (state) => (
  JSON.parse(JSON.stringify(state))
)

export default (state = defaultState, action) => {
  switch (action.type) {
    case actionType.HANDLE_LOAD_LIST: {
      const newState = copyState(state)
      newState.homeList = action.list
      return newState
    }
    case actionType.HANDLE_FILTEREDINFO_CHANGE: {
      const newState = copyState(state)
      newState.filteredInfo = action.filters
      return newState
    }
    case actionType.CLEAR_FILTERS: {
      const newState = copyState(state)
      newState.filteredInfo = null
      return newState
    }
    case actionType.HANDLE_FILTERS: {
      const newState = copyState(state)
      newState.filters = action.filters
      return newState
    }
    case actionType.HANDLE_ERROR: {
      const newState = copyState(state)
      newState.errorMsg = 'Something wrong with server or net connection!'
      return newState
    }
    case actionType.CLEAR_ERROR: {
      const newState = copyState(state)
      newState.errorMsg = ''
      return newState
    }
    default:
      return state
  }
}