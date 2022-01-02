import { initializeApp } from 'firebase/app';
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyBdJyWktf6Rq0TJqG7efrfVT3GIVbYhwZ0",
    authDomain: "healthconnect-d2281.firebaseapp.com",
    projectId: "healthconnect-d2281",
    storageBucket: "healthconnect-d2281.appspot.com",
    messagingSenderId: "346560193175",
    appId: "1:346560193175:web:64172152847437c857bfd2"
  };
  initializeApp(firebaseConfig);
  const auth=getAuth();
  const db=getFirestore();
  export {db,auth};