import firebaseApp  from '../firebase/App'

export const authenticate = (admin) =>{
    return dispatch =>{
        dispatch({
            type: 'AUTH_SIGNIN',
            status: 'SIGNIN_REQUEST',
            loading: true
        })
        const authRef = firebaseApp.auth()
        authRef.signInWithEmailAndPassword(admin.email,  admin.password)
            .then(credential =>{
                credential.user.getIdTokenResult()
                .then( idToken =>{
                    dispatch({
                        type: 'AUTH_SIGNIN',
                        status: 'SIGNIN_SUCCESS',
                        loading: false,
                        auth : true,
                        userid: idToken.token
                    })
                })
            }, err=>{
                dispatch({
                    type: 'AUTH_SIGNIN',
                    status: 'SIGNIN_FAILED',
                    loading: false,
                    auth:false,
                    userid: null
                })
            })
    }
}

export const signout = () =>{
    return dispatch =>{
        dispatch({
            type: 'AUTH_SIGNOUT',
            status: 'SIGNOUT_REQUEST',
            loading: true
        })
        firebaseApp.auth().signOut().then(()=>{
            dispatch({
                type: 'AUTH_SIGNOUT',
                status: 'SIGNOUT_SUCCESS',
                loading: false,
                auth: false,
                userid: null

            })
        }, err=>{
            dispatch({
                type: 'AUTH_SIGNOUT',
                status: 'SIGNOUT_FAILED',
                loading: false
            })
        })
    }
}