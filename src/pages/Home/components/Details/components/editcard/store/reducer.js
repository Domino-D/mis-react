import * as actionType from './actiontype'

const defaultState = {
  data: [
    {
      key: '0',
      original: 'Original No.',
      material: 'Material No.',
      description: 'Item Descriptions',
      vandor: 'Manufacturer'
    }
  ],
  editingKey: '',
  drawerShow: false,
  selectedItem: {},
  errorMsg: ''
}

const copyState = (state) => (
  JSON.parse(JSON.stringify(state))
)

export default (state = defaultState, action) => {
  switch (action.type) {
    case actionType.HANDLE_DATA_LOAD: {
      const newState = copyState(state)
      newState.data = action.data
      return newState
    }
    case actionType.HANDLE_EDITINGKEY_CHANGE: {
      const newState = copyState(state)
      newState.editingKey = action.editingKey
      return newState
    }
    case actionType.DRAWER_TRIGGER: {
      const newState = copyState(state)
      newState.drawerShow = !newState.drawerShow
      return newState
    }
    case actionType.SELECT_ITEM: {
      const newState = copyState(state)
      newState.selectedItem = action.obj
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