import FirebaseApp from '../firebase/app'


export const authenticate = (username, password) =>{
    return (dispatch) => {
        dispatch({
            type: 'USER_AUTH',
            loading: true,
            data:[]
        })
        FirebaseApp.auth().signInWithEmailAndPassword(username, password)
            .then(credential=>{
                dispatch({
                    type: 'USER_AUTH',
                    auth: true,
                    loading: false,
                    loginfailed: false,
                    user: {
                        uname: credential.user.email
                    }
                })
            }, val=>{
                dispatch({
                    type: 'USER_AUTH',
                    auth: false,
                    loading: false,
                    loginfailed: true,
                    user: {
                        uname: username
                    }
                })
            })
    }
}

export const logout = () =>{
    return (dispatch) =>{
        FirebaseApp.auth().signOut()
        .then(val=>{
            dispatch({
                type: 'USER_LOGOUT',
                auth: false
            })
        }).catch(()=>{
            dispatch({
                type: 'USER_LOGOUT',
                auth: true
            })
        })
    }
}

export const register = (user)=>{
    return dispatch =>{
        FirebaseApp.auth().createUserWithEmailAndPassword(user.email, user.password).then(credential=>{
            let body = {
                name: user.name,
                address: user.address,
                phone: user.phone
            }
            FirebaseApp.database().ref(`/users/${user.email.replace('.', '_')}`)
            .set(body)
            dispatch({
                type: 'USER_AUTH',
                auth: true,
                loading: false,
                loginfailed: false,
                user: {
                    uname: credential.user.email
                }
            })
        }, val=>{
            dispatch({
                type: 'USER_AUTH',
                auth: false,
                loading: false,
                loginfailed: true,
                user: {
                    uname: user.email
                }
            })
        })
    }
}
