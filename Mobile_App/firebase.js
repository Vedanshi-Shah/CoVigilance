import { initializeApp } from 'firebase/app';
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAEfN8F6VGda3RBdSoo5L61oYEbCt8_nZA",
  authDomain: "covigilence-e6cb0.firebaseapp.com",
  databaseURL: "https://covigilence-e6cb0-default-rtdb.firebaseio.com",
  projectId: "covigilence-e6cb0",
  storageBucket: "covigilence-e6cb0.appspot.com",
  messagingSenderId: "646156017434",
  appId: "1:646156017434:web:1570fa18c84f2613d156a3"
};
  initializeApp(firebaseConfig);
  const auth=getAuth();
  const db=getFirestore();
  export {db,auth};