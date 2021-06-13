import {combineReducers} from 'redux'
import product from './productReducer'
import user from './userReducer'

export default combineReducers({
    product, user
})