import * as actionType from './actiontype'

const defaultState = {
  filteredInfo: null,
  filters: [],
  homeList: [
    {
      key: '1',
      original: 'John Brown',
      material: 32,
      description: 'boy',
      vandor: 'shop',
      contributor: 'man',
      creation: '10-25',
      status: 'active'
    }, {
      key: '2',
      original: 'Jim Green',
      material: 42,
      description: 'boy',
      vandor: 'shop',
      contributor: 'man',
      creation: '10-25',
      status: 'active'
    }, {
      key: '3',
      original: 'Joe Black',
      material: 32,
      description: 'boy',
      vandor: 'shop',
      contributor: 'man',
      creation: '10-25',
      status: 'active'
    }
  ]
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
    default:
      return state
  }
}