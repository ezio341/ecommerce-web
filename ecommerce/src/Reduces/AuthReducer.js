let INITIAL_DATA = {
    auth: false
}

const AUTH = (state=INITIAL_DATA, action) =>{
    switch(action.type){
        case 'USER_AUTH':
            return {
                ...state,
                auth: action.auth,
                user: action.user,
                loading: action.loading,
                loginfailed: action.loginfailed
            }
        case 'USER_LOGOUT':
            return {
                ...state,
                auth: action.auth,
                loading: action.loading
            }
        default:
            return state
    }
}
export default AUTH