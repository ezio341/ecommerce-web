let INITIAL_STATE = []

const ProductReducer = (state=INITIAL_STATE, action) =>{
    switch(action.type){
        case 'PRODUCT_GET':
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

export default ProductReducer