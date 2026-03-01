// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; 
import { getAuth, GoogleAuthProvider, setPersistence, browserLocalPersistence } from "firebase/auth";




// all the values are stored in .env file
// and we are using vite so we have to use import.meta.env.VITE_variableName
const firebaseConfig = {
  apiKey: import.meta.env.VITE_apiKey,
  authDomain: import.meta.env.VITE_authDomain,
  projectId: import.meta.env.VITE_projectId,
  storageBucket: import.meta.env.VITE_storageBucket,
  messagingSenderId: import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.VITE_appId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ye baba ke ek baar initialize ho gaya hai to baar baar nahi hoga
// and we can use it in our application
const firebaseDB = getFirestore(app);
const auth = getAuth(app);
const firebaseStorage = getStorage(app);
const googleProvider = new GoogleAuthProvider();
setPersistence(auth, browserLocalPersistence);


export {firebaseDB, auth, firebaseStorage, googleProvider}