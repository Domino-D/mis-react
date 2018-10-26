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

export const handleError = () => ({
  type: actionType.HANDLE_ERROR
})

export const preloadList = () => (
  (dispatch) => {
    axios.get('/partsdata')
      .then((res) => {
        const data = toChangeKeyAndValue(res.data)
        dispatch(loadList(data))
        dispatch(handleFilters(toFilters(data)))
      })
      .catch((err) => {
        dispatch(handleError())
      })
  })

const toFilters = (arr) => {
  let multiArr = [[], [], [], [], [], []]
  let filters = [[], [], [], [], [], []]

  for (const item of arr) {
    for (const key in item) {
      switch (key) {
        case 'original': {
          multiArr[0].push(item[key])
          filters[0].push({ text: item[key], value: item[key] })
          break
        }
        case 'material': {
          multiArr[1].push(item[key])
          filters[1].push({ text: item[key], value: item[key] })
          break
        }
        case 'description': {
          if (multiArr[2].includes(item[key])) {
            break
          } else {
            multiArr[2].push(item[key])
            filters[2].push({ text: item[key], value: item[key] })
            break
          }
        }
        case 'vandor': {
          if (multiArr[3].includes(item[key])) {
            break
          } else {
            multiArr[3].push(item[key])
            filters[3].push({ text: item[key], value: item[key] })
            break
          }
        }
        case 'contributor': {
          if (multiArr[4].includes(item[key])) {
            break
          } else {
            multiArr[4].push(item[key])
            filters[4].push({ text: item[key], value: item[key] })
            break
          }
        }
        case 'creation': {
          if (multiArr[5].includes(item[key])) {
            break
          } else {
            multiArr[5].push(item[key])
            filters[5].push({ text: item[key], value: item[key] })
            break
          }
        }
        default:
          break
      }
    }
  }
  return filters
}

const toChangeKeyAndValue = (arr) => {
  for (const item of arr) {
    item.key = item.id
    delete item.id
    let temp = item.creation.slice(0, 16).replace(/T/ig, ' ')
    item.creation = temp
  }
  return arr
}