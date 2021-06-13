let INITIAL_VALUE=[]

const UserReducer = (state = INITIAL_VALUE, action)=>{
    switch(action.type){
        case 'USER_GET':
            return {
                ...state,
                ...action
            }
        default:
            return{
                ...state
            }
    }
}

export default UserReducer