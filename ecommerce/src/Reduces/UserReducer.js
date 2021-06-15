let INITIAL_DATA = []
const UserReducer = (state={}, action)=>{
    switch(action.type){
        case 'USER_GET':
            return {
                ...state,
                ...action
            }
        case 'USER_DELETE':
            return {
                ...state,
                ...action
            }
        default:
            return state
    }
}
export default UserReducer