import * as actionType from './actiontype'
import axios from 'axios'

export const loadList = (list) => ({
  type: actionType.HANDLE_LOAD_LIST,
  list
})

export const preloadList = () => (
  (dispatch) => {
    axios.get()
    .then((res) => {

    })
    .catch((err) => {

    })
  })