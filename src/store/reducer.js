import { combineReducers } from 'redux'
import home_reducer from '../pages/Home/store/reducer'

export default combineReducers({
  home: home_reducer
})