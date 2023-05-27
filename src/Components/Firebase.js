import "firebase/auth"
import "firebase/firestore"
import 'firebase/database'
import { initializeApp } from "firebase/app"
import {
    GoogleAuthProvider,
    getAuth,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
} from 'firebase/auth'

import {
    getFirestore,
    query,
    getDocs,
    collection,
    where,
    addDoc,
} from 'firebase/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyCUGj6yMVEFFAO--Am4OzHldBNN2_-3lS8",
    authDomain: "reddit-clone-728f7.firebaseapp.com",
    projectId: "reddit-clone-728f7",
    storageBucket: "reddit-clone-728f7.appspot.com",
    messagingSenderId: "1073508298977",
    appId: "1:1073508298977:web:ce80f745e6bb271b10c7a0"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Google authentication
const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};



// Email signin authentication
const logInWithEmailAndPassword = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return true
    } catch (err) {
      console.error(err);
      return false
    }
};

// Email registration 
const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (err) {
    console.error(err);
  }
};


// Email password reset
const sendPasswordReset = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email)
      alert("Password reset link sent!")
      return true
    } catch (err) {
      console.error(err)
      alert(err.message)
    }
};

// Logout 
const logout = () => {
    signOut(auth);
};

export {
    auth,
    db,
    signInWithGoogle,
    logInWithEmailAndPassword,
    registerWithEmailAndPassword,
    sendPasswordReset,
    logout,
};