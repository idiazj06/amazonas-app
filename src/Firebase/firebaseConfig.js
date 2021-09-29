import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider } from  'firebase/auth';
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDHYM9t5LTT72qTg5ICEs-j9wBkl3jhP1I",
    authDomain: "as-app-ed72a.firebaseapp.com",
    projectId: "as-app-ed72a",
    storageBucket: "as-app-ed72a.appspot.com",
    messagingSenderId: "933546082891",
    appId: "1:933546082891:web:95510490d909e12644c3ce"
};

const app = initializeApp(firebaseConfig);
const google =  new GoogleAuthProvider();
const db = getFirestore(app)

export{
    app,
    google,
    db
}