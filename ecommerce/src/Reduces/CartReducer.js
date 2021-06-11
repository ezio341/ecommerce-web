let INITIAL_DATA = {
    data : []
}
const CartReducer = (state = INITIAL_DATA, action) =>{
    switch(action.type){
        case 'ADD_CART':
            return {
                ...state,
                new: action.data,
                status: action.status
            }
        case 'DELETE_CART':
            return {
                ...state,
                status: action.status,
                deleteloading: action.deleteloading
            }
        case 'SHOW_CART':
            return {
                ...state,
                data: action.data,
                status: action.status,
                fetchloading: action.fetchloading
            }
        case 'UPDATE_CART':
            return{
                ...state,
                status: action.status
            }
        default:
            return state
    }
}
export default CartReducer