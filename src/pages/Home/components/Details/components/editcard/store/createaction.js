import * as actionType from './actiontype'
import axios from 'axios'

export const loadData = (data) => ({
  type: actionType.HANDLE_DATA_LOAD,
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

export const handleError = () => ({
  type: actionType.HANDLE_ERROR
})

export const clearError = () => ({
  type: actionType.CLEAR_ERROR
})

export const deleteItem = (_id) => (
  (dispatch) => {
    axios.get(`/partsdata/${_id}`)
    .then(function(res) {
      dispatch(preloadData())
      dispatch(clearError())
    })
    .catch(function(err) {
      dispatch(handleError())
    })
  })

export const preloadData = () => (
  (dispatch) => {
    axios.get('/partsdata')
    .then(function(res) {
      const data = changeKey(res.data)
      dispatch(loadData(data))
      dispatch(clearError())
    })
    .catch(function(err) {
      dispatch(handleError())
    })
  })

export const changeData = (data) => (
  (dispatch) => {
    const _id = data.key
    axios.post(`/partsdata/${_id}`, data)
    .then(function(res) {
      dispatch(preloadData())
      dispatch(clearError())
    })
    .catch(function(err) {
      dispatch(handleError())
    })
  })

  const changeKey = (arr) => {
    for (const item of arr) {
      item.key = item.id
      delete item.id
      let temp = item.creation.slice(0, 16).replace(/T/ig, ' ')
      item.creation = temp
    }
    return arr
  }