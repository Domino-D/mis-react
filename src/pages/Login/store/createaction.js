import * as actionType from './actiontype'
import axios from 'axios'

export const accountInput = (account) => ({
  type: actionType.HANDLE_ACCOUNT_INPUT,
  account
})

export const passwordInput = (password) => ({
  type: actionType.HANDLE_PASSWORD_INPUT,
  password
})

export const login = () => ({
  type: actionType.HANDLE_LOGIN
})

export const loginError = () => ({
  type: actionType.HANDLE_LOGIN_ERROR
})

export const serverError = () => ({
  type: actionType.HANDLE_SERVER_ERROR
})

export const preLogin = (account, password) => {
  return (dispatch) => {
    const formData = {
      email: account,
      pwd: password
    }
    axios.post('/session', formData)
      .then((res) => {
        console.log('000')
        res[0] ? dispatch(login()) : dispatch(loginError())
      })
      .catch(() => {
        dispatch(serverError())
      })
  }
}