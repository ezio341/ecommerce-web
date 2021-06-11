import {combineReducers} from 'redux'
import cart from './CartReducer'
import auth from './AuthReducer'
import user from './UserReducer'

export default combineReducers({
    user, cart, auth
})