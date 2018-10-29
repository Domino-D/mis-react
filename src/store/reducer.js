import { combineReducers } from 'redux'
import home_reducer from '../pages/Home/store/reducer'
import login_reducer from '../pages/Login/store/reducer'
import list_reducer from '../pages/Home/components/List/store/reducer'
import edit_reducer from '../pages/Home/components/Details/components/editcard/store/reducer'

export default combineReducers({
  home: home_reducer,
  login: login_reducer,
  list: list_reducer,
  edit: edit_reducer
})