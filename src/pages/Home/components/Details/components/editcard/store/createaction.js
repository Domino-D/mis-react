import * as actionType from './actiontype'

export const loadData = () => ({

})

export const changeData = (data) => ({
  type: actionType.HANDLE_DATA_CHANGE,
  data
})

export const changeEditingKey = (editingKey) => ({
  type: actionType.HANDLE_EDITINGKEY_CHANGE,
  editingKey
})

export const drawerTrigger = () => ({
  type: actionType.DRAWER_TRIGGER
})

export const item2drawer = (obj) => ({
  type: actionType.SELECT_ITEM,
  obj
})

export const selectItem = (key, data) => (
  (dispatch) => {
    const index = data.findIndex(item => key === item.key)
    dispatch(item2drawer(data[index]))
    dispatch(drawerTrigger())
  })