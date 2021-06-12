import firebaseApp from '../firebase/App'

export const fetchProduct = () =>{
    return dispatch =>{
        dispatch({
            type: 'PRODUCT_GET',
            status: 'GET_LOADING',
            loading: true
        })
        const productRef = firebaseApp.database().ref('/products')
        productRef.on('value', snapshot=>{
            let products = snapshot.val()
            if(products === null) products=[]
            dispatch({
                type: 'PRODUCT_GET',
                status: 'GET_SUCCESS',
                loading: false,
                products
            })
        }, err=>{
            dispatch({
                type: 'PRODUCT_GET',
                status: 'GET_FAILED',
                loading: false,
                products: []
            })
        })
    }
}