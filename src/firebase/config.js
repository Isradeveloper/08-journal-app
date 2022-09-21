// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore/lite'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBT8UXpaxu7EsGmhKLj4snP3gF85EQi_Qo',
  authDomain: 'journal-e05cb.firebaseapp.com',
  projectId: 'journal-e05cb',
  storageBucket: 'journal-e05cb.appspot.com',
  messagingSenderId: '882483008624',
  appId: '1:882483008624:web:c750bfef35a6cc8c8c90b5'
}

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig)

export const FirebaseAuth = getAuth(FirebaseApp)

export const FirebaseDB = getFirestore(FirebaseApp)
