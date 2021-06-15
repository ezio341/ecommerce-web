let INITIAL_DATA = {
    auth: false
}

const AUTH = (state=INITIAL_DATA, action) =>{
    switch(action.type){
        case 'USER_AUTH':
            return {
                ...state,
                ...action
            }
        case 'USER_LOGOUT':
            return {
                ...state,
                ...action
            }
        default:
            return state
    }
}
export default AUTH