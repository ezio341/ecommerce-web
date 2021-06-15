import firebaseApp from '../firebase/app'

export const getuserinfo = (email) => {
    return dispatch =>{
        dispatch({
            type: 'USER_GET',
            status: 'GET_LOADING',
            loading: true
        })
        if(email !== ''){
        const userRef = firebaseApp.database().ref(`/users/${email.replace('.', '_')}`)
        userRef.on('value',snapshot=>{
            let user = snapshot.val()
            dispatch({
                type: 'USER_GET',
                status: 'GET_SUCCESS',
                ...user,
                loading: false
            })
        }, err=>{
            dispatch({
                type: 'USER_GET',
                status: 'GET_FAILED',
                loading: false
            })
        })
    }
    }
}
export const deleteAccount = () =>{
    return dispatch =>{
        dispatch({
            type: 'USER_DELETE',
            status: 'DELETE_LOADING',
            loading: true
        })
        const userRef = firebaseApp.database().ref(`users/${firebaseApp.auth().currentUser.email.replace('.', '_')}`)
        const cartRef = firebaseApp.database().ref(`carts/${firebaseApp.auth().currentUser.email.replace('.', '_')}`)
        firebaseApp.auth().currentUser.delete().then(()=>{
            userRef.remove().then(val=>{
                cartRef.remove()
                dispatch({
                    type: 'USER_DELETE',
                    status: 'DELETE_SUCCESS',
                    loading: false
                })
            }, err=>[
                dispatch({
                    type: 'USER_DELETE',
                    status: 'DELETE_FAILED',
                    loading: false
                })
            ])
        }, err =>{
            dispatch({
                type: 'USER_DELETE',
                status: 'DELETE_FAILED',
                loading: false
            })
        })
    }
}