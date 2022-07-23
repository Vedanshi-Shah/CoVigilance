import { initializeApp } from 'firebase/app'
// import { GoogleAuthProvider, getAuth, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, signOut ​} from "firebase/auth";
// ​​import { getFirestore, query, getDocs, collection, where, addDoc, ​} from "firebase/firestore";
import { GoogleAuthProvider, getAuth, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, signOut, onAuthStateChanged } from 'firebase/auth'
import { getFirestore, query, getDocs, collection, where, addDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { Redirect, useHistory } from 'react-router-dom'


// Use your config values here.
const firebaseConfig = {
  apiKey: 'AIzaSyC93Peub_i0HvX_3aQBICCC6NfB8mfydPY',
  authDomain: 'covigilence1-ecf6e.firebaseapp.com',
  databaseURL: 'https://covigilence1-ecf6e-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'covigilence1-ecf6e',
  storageBucket: 'covigilence1-ecf6e.appspot.com',
  messagingSenderId: '112440149008',
  appId: '1:112440149008:web:893c50ca30069240d3b695',
  measurementId: 'G-BF4CFHN3M5',
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app);

const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
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
    alert(err.message);
  }
};
const logout = () => {
  signOut(auth);
  return <Redirect to='/login'/>
};

export const isLoggedIn = () => {

  if (auth.currentUser != null){
    console.log(auth.currentUser)
    return true
  }return false
};

function login(email, password) {
  return auth.signInWithEmailAndPassword(email, password)
}

export {
  auth,
  db,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  login,
  logout,
};