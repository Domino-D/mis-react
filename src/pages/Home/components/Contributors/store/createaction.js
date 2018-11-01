import * as actionType from './actiontype'
import axios from 'axios'

export const loadUserList = (users) => ({
  type: actionType.LOAD_USER_LIST,
  users
})

export const emailChange = (email) => ({
  type: actionType.HANDLE_EMAIL_CHANGE,
  email
})

export const passwordChange = (pwd) => ({
  type: actionType.HANDLE_PASSWORD_CHANGE,
  pwd
})

export const resetNewAdmin = () => ({
  type: actionType.RESET_NEW_ADMIN
})

export const setErrorMsg = (msg) => ({
  type: actionType.SET_ERROR_MSG,
  msg
})

const msg = 'Some thing wrong with server or net connection. Please try later.'

export const preCreateNewAdmin =(data) =>(
  (dispatch) => {
    axios.post('/user', data)
    .then(function(res) {
      dispatch(resetNewAdmin())
      dispatch(setErrorMsg(''))
      dispatch(preloadUserList())
    })
    .catch(function(err) {
      dispatch(setErrorMsg(msg))
      dispatch(resetNewAdmin())
    })
  })

export const deleteAdmin = (_id) =>(
  (dispatch) => {
    axios.get(`/user/${_id}`)
    .then(function(res) {
      dispatch(setErrorMsg(''))
      dispatch(preloadUserList())
    })
    .catch(function(err) {
      dispatch(setErrorMsg(msg))
    })
  })

export const preloadUserList = () =>(
  (dispatch) => {
    axios.get('/user')
    .then(function(res) {
      const list = handleUserData(res.data)
      dispatch(setErrorMsg(''))
      dispatch(loadUserList(list))
    })
    .catch(function(err) {
      dispatch(setErrorMsg(msg))
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