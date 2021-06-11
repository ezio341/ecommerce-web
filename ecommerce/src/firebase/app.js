import firebase from 'firebase'
import firebaseConfig from './config'

const FirebaseApp = () =>{
    if(!firebase.apps.length){
        return firebase.initializeApp(firebaseConfig)
    }
}
export default FirebaseApp()
