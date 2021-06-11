import FirebaseApp from '../firebase/app'
export const addCart = (data) => {
    return (dispatch) => {
        const body = {
            id: new Date().getTime().toString(),
            productid: data.id, 
            name: data.name, 
            price: data.price, 
            stock: data.stock, 
            desc: data.desc,
            img: data.img,
            amount: 1,
            rate: data.rate
        }
        const dbRef = FirebaseApp.database().ref(`/carts/${FirebaseApp.auth().currentUser.email.replace('.', '_')}/cart`)
        dbRef.get().then(snapshot=>{
            let carts = snapshot.val()
            if(carts === null){
                carts = []
            }
            carts.push(body)
            dbRef.set(carts).then(val=>{
                dispatch({
                    type: 'ADD_CART',
                    status: 'ADD_SUCCESS'
                })
            }, res=>{
                dispatch({
                    type: 'ADD_CART',
                    status: 'ADD_FAILED'
                })
            })
            
        })
    }
}
export const deleteCart = (id) =>{
    return (dispatch) => {
        dispatch({
            type: 'DELETE_CART',
            status: 'DELETE_LOADING',
            deleteloading: true
        })
        const dbRef = FirebaseApp.database().ref(`/carts/${FirebaseApp.auth().currentUser.email.replace('.', '_')}/cart`)
        dbRef.get().then(snapshot=>{
            let carts = snapshot.val()
            dbRef.set(carts.filter(item =>{
                return item.id !== id
            })).then(val=>{
                dispatch({
                    type: 'DELETE_CART',
                    status: 'DELETE_SUCCESS',
                    deleteloading: false
                })
            }, res=>{
                dispatch({
                    type: 'DELETE_CART',
                    status: 'DELETE_FAILED',
                    deleteloading: false
                })
            })
            
        })
    }
}
export const showCart = () =>{
    return (dispatch) =>{
        dispatch({
            type: 'SHOW_CART',
            status: 'FETCH_LOADING',
            fetchloading: true,
            data:[]
        })
        const dbRef = FirebaseApp.database().ref(`/carts/${FirebaseApp.auth().currentUser.email.replace('.', '_')}/cart`)
        dbRef.on('value', snapshot=>{
            let carts = snapshot.val()
            if(carts === null){
                carts = []
            }
            dispatch({
                type: 'SHOW_CART',
                status: 'FETCH_SUCCESS',
                data: carts,
                fetchloading: false
            })
        }, err=>{
            console.log('fetch failed')
            dispatch({
                type: 'SHOW_CART',
                status: 'FETCH_FAILED',
                data: [],
                fetchloading: false
            })
        })
    } 
}
export const updateCart = (cart) => {
    return (dispatch) => {
        const dbRef = FirebaseApp.database().ref(`/carts/${FirebaseApp.auth().currentUser.email.replace('.', '_')}/cart`)
        dbRef.get().then(snapshot=>{
            let carts = snapshot.val()
            dbRef.set(carts.map(item=>{
                return item.id === cart.id? cart:item
            })).then(val=>{
                dispatch({
                    type: 'UPDATE_CART',
                    status: 'UPDATE_SUCCESS'
                })
            }, res=>{
                dispatch({
                    type: 'UPDATE_CART',
                    status: 'UPDATE_SUCCESS'
                })
            })
        })
    }
}