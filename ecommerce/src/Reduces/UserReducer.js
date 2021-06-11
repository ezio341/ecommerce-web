let INITIAL_DATA = []
const UserReducer = (state={}, action)=>{
    switch(action.type){
        case 'USER_GET':
            return {
                ...state,
                ...action.payload,
                status: action.status,
                userloading: action.loading
            }
        default:
            return state
    }
}
export default UserReducer