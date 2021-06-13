import {combineReducers} from 'redux'
import product from './productReducer'
import user from './userReducer'
import auth from './authReducer'

export default combineReducers({
    product, user, auth
})