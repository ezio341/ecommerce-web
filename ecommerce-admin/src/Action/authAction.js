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
                    localStorage.setItem('_authadm', true)
                    localStorage.setItem('_authdatetime', new Date().getTime())
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

export const verifySession = () =>{
    return dispatch =>{
        const user = localStorage.getItem('_authadm')
        if(user){
            dispatch({
                type:'AUTH_SESSION',
                auth: user
            })
        }
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
            localStorage.clear()
        }, err=>{
            dispatch({
                type: 'AUTH_SIGNOUT',
                status: 'SIGNOUT_FAILED',
                loading: false
            })
        })
    }
}