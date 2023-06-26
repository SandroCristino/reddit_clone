import "firebase/auth"
import "firebase/firestore"
import 'firebase/database'
import { initializeApp } from "firebase/app"
import { getStorage } from "firebase/storage";
import { getFirestore, setDoc, doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { setUser } from "./userReducer.js";

import {
    GoogleAuthProvider,
    getAuth,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
    updatePassword,
} from 'firebase/auth'

import {
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

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage(app)

// Google authentication
const googleProvider = new GoogleAuthProvider()
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
    
    // Update user authentication state
    const updatedUser = {
      ...user,
      isLoggedIn: true,
      displayName: user.displayName,
    };
    
    setUser(updatedUser); // Update the user state using the setUser function

  } catch (err) {
    console.error(err);
  }
};

// // Google authentication
// const googleProvider = new GoogleAuthProvider()
// const signInWithGoogle = async () => {
//   try {
//     const res = await signInWithPopup(auth, googleProvider)
//     const user = res.user
//     const q = query(collection(db, "users"), where("uid", "==", user.uid))
//     const docs = await getDocs(q)
//     if (docs.docs.length === 0) {
//       await addDoc(collection(db, "users"), {
//         uid: user.uid,
//         name: user.displayName,
//         authProvider: "google",
//         email: user.email,
//       })
//     }
//   } catch (err) {
//     console.error(err)
//   }
// }

// Email signin authentication
const logInWithEmailAndPassword = async (email, password) => {
    try {
      return await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error(err)
      return false
    } 
}

// Email registration 
const registerWithEmailAndPassword = async (name, email, password) => {
  try {

    const res = await createUserWithEmailAndPassword(auth, email, password)
    const user = res.user

    try {
      setDoc(doc(db, `users/${user.uid}`), {
        uid: user.uid,
        name, 
        authProvider: "local",
        email,
      });
    } catch (e) {
      console.log(e)
    }
   
    // Update user authentication state
    const updatedUser = {
      ...user,
      isLoggedIn: true,
      displayName: name,
    }

    return updatedUser
  } catch (err) {
    console.error(err);
    return false 
  } 
}

// Email password reset
const sendPasswordReset = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email)
      alert("Password reset link sent!")
      return true
    } catch (err) {
      console.error(err)
    }
}

// Logout 
const logout = () => {
    signOut(auth);
}

// Update server data with specific parameter
async function updateServerData(fileSource, fileId, attribute, value) {
  try {
    await updateDoc(doc(db, `${fileSource}/${fileId}`), {
        [attribute]: arrayUnion(value)
    })
  } catch (error) {
      console.log(error)
  }
}

// Replace server data with specific parameter
async function updateReplaceServerData(fileSource, fileId, attribute, value) {
  try {
    await updateDoc(doc(db, `${fileSource}/${fileId}`), {
        [attribute]: value
    })
  } catch (error) {
      console.log(error)
  }
}

// Get user data 
async function getUserServerData(userUid) {
  try {
    const q = query(collection(db, 'users'), where("uid", "==", userUid))
    const doc = await getDocs(q)
    if (!doc.docs[0]) return
    const data = doc.docs[0].data()
    return data
  } catch (err) {
    console.error(err)
  }
}

// Update user password
const changePassword = async (newPassword) => {
  try {
    const user = await auth.currentUser;
    updatePassword(user, newPassword)
    return true
  } catch (error) {
    return error
  }
}

export {
    auth,
    db,
    signInWithGoogle,
    logInWithEmailAndPassword,
    registerWithEmailAndPassword,
    sendPasswordReset,
    logout,
    storage,
    updateServerData,
    updateReplaceServerData,
    getUserServerData,
    changePassword
}