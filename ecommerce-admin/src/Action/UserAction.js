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

export const updateUser = (user) =>{
    return dispatch =>{
        dispatch({
            type:'USER_UPDATE',
            status: 'UPDATE_LOADING',
            loading: true
        })
        const userRef = firebaseApp.database().ref(`/users/${user.id}`)
        userRef.update(user).then(val=>{
            dispatch({
                type:'USER_UPDATE',
                status: 'UPDATE_SUCCESS',
                loading: false
            })
        }, err=>{
            dispatch({
                type:'USER_UPDATE',
                status: 'UPDATE_FAILED',
                loading: false
            })
        })
    }
}
