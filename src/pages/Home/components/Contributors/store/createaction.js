import * as actionType from './actiontype'
import axios from 'axios'

export const loadUserList = (users) => ({
  type: actionType.LOAD_USER_LIST,
  users
})

export const preloadUserList = () =>(
  (dispatch) => {
    axios.get('/user')
    .then(function(res) {
      const list = handleUserData(res.data)
      dispatch(loadUserList(list))
    })
    .catch(function(err) {

    })
  })

const handleUserData = (data) => {
  for (const item of data) {
    console.log(item)
    let temp = item.time.slice(0, 10)
    item.time = temp
  }
  return data
}