import * as actionType from './actiontype'
import axios from 'axios'

export const loadList = (list) => ({
  type: actionType.HANDLE_LOAD_LIST,
  list
})

export const changeFilteredInfo = (filters) => ({
  type: actionType.HANDLE_FILTEREDINFO_CHANGE,
  filters
})

export const clearFilters = () => ({
  type: actionType.CLEAR_FILTERS
})

export const handleFilters = (filters) => ({
  type: actionType.HANDLE_FILTERS,
  filters
})

export const preloadList = () => (
  (dispatch) => {
    axios.get()
    .then((res) => {
      dispatch(loadList(res))
      toFilters(res)
    })
    .catch((err) => {

    })
  })

  const toFilters = (arr) => {
    for (const iterator of arr) {
      
    }
  }