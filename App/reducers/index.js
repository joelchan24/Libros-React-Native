import { combineReducers } from 'redux'
import bookReducer from './nextPurchaseReducer'
//conector de aplicación react-native entre vistas
const rootReducer = combineReducers({
  bookReducer
})

export default rootReducer
