let INITIAL_STATE = []

const AuthReducer = (state = INITIAL_STATE, action) =>{
    switch(action.type){
        case 'AUTH_SIGNIN':
            return {
                ...state,
                ...action
            }
        case 'AUTH_SIGNOUT':
            return{
                ...state,
                ...action
            }
        default:
            return {
                ...state
            }
    }
}

export default AuthReducer