import * as actionType from './actiontype'

const defaultState = {
  data: [
    {
      key: '0',
      original: `Edrward 0`,
      material: 32,
      description: `London Park no. 0`,
      vandor: 'anchor'
    },
    {
      key: '1',
      original: `Edrward 1`,
      material: 32,
      description: `London Park no. 1`,
      vandor: 'anchor'
    }
  ],
  editingKey: '',
  drawerShow: false,
  selectedItem: {}
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
    case actionType.HANDLE_DATA_CHANGE: {
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
    default:
      return state
  }
}