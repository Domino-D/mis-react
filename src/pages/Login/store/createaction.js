import * as actionType from './actiontype'
import { createAction as home_createAction } from '../../Home/store'
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

export const preLogin = (account, password) => (
  (dispatch) => {
    const formData = {
      email: account,
      pwd: password
    }
    axios.post('/session', formData)
      .then((res) => {
        const data = res.data[0]
        if (data) {
          dispatch(login())
          data.identity === "root" ?
            dispatch(home_createAction.authority(1)) :
            dispatch(home_createAction.authority(0))
        } else {
          dispatch(loginError())
        }
      })
      .catch(() => {
        dispatch(serverError())
      })
  })