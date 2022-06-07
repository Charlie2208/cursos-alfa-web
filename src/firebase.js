import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDwEe_r1hd_1YCwc84cRBP_bjoMjVJxgdc",
    authDomain: "cursos-alfaweb-e63a4.firebaseapp.com",
    projectId: "cursos-alfaweb-e63a4",
    storageBucket: "cursos-alfaweb-e63a4.appspot.com",
    messagingSenderId: "444936256242",
    appId: "1:444936256242:web:3e045d667899de39082e6b"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)

const currentUserPromise = () => new Promise((resolve, reject) => {
    onAuthStateChanged(auth, user => {
        resolve(user)
    }, e => reject(e))
})

export { auth, currentUserPromise, db }