import firebaseApp from '../firebase/App'

export const fetchUser = ()=>{
    return dispatch=>{
        dispatch({
            type:'USER_GET',
            status: 'GET_LOADING',
            loading: true
        })
        const userRef = firebaseApp.database().ref('/users')
        userRef.on('value', snapshot=>{
            let users = snapshot.val()
            dispatch({
                type:'USER_GET',
                status: 'GET_SUCCESS',
                loading: false,
                users
            })
        }, err=>{
            dispatch({
                type:'USER_GET',
                status: 'GET_FAILED',
                loading: false,
                users:[]
            })
        })
    }
}
