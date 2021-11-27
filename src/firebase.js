//import firebase from 'firebase';  
import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyDrIkmrQnAJmaad9GjARyBX_FQ7YGqRUOY",
    authDomain: "netflix-clone-28993.firebaseapp.com",
    projectId: "netflix-clone-28993",
    storageBucket: "netflix-clone-28993.appspot.com",
    messagingSenderId: "692603438770",
    appId: "1:692603438770:web:eebb3a0ebe6e1978896bab"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore()
const auth = firebase.auth()

export { auth }
export default db