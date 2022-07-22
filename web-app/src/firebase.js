import { initializeApp } from 'firebase/app'
import 'firebase/auth'

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
export const auth = app.auth()
export default app
