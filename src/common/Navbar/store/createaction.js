import * as actionType from './actiontype'

export const changeDefaultKey = (key) => ({
  type: actionType.HANDLE_DEFAULTKEY_CHANGE,
  key
})