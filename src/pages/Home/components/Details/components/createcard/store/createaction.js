import * as actionType from './actiontype'
import axios from 'axios'

export const inputOriginal = (text) => ({
  type: actionType.HANDLE_INPUT_ORIGINAL,
  text
})

export const inputMaterial = (text) => ({
  type: actionType.HANDLE_INPUT_MATERIAL,
  text
})

export const inputDescription = (text) => ({
  type: actionType.HANDLE_INPUT_DESCRIPTION,
  text
})

export const inputVandor = (text) => ({
  type: actionType.HANDLE_INPUT_VANDOR,
  text
})

export const setCreated = () => ({
  type: actionType.SET_CREATED
})

export const createError = (msg) => ({
  type: actionType.HANDLE_CREATE_ERROR,
  msg
})

export const resetNewData = () => ({
  type: actionType.RESET_NEW_DATA
})

export const addNewData = (data) => (
  (dispatch) => {
    axios.post('/partsdata', data)
      .then(function (res) {
        dispatch(setCreated())
        dispatch(createError(''))
        dispatch(resetNewData())
      })
      .catch(function (err) {
        const msg = 'Failed to create new data.'
        dispatch(createError(msg))
      })
  })