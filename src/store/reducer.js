import { combineReducers } from 'redux'
import home_reducer from '../pages/Home/store/reducer'
import login_reducer from '../pages/Login/store/reducer'

export default combineReducers({
  home: home_reducer,
  login: login_reducer
})