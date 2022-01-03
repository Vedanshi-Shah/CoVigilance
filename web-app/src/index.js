import 'react-app-polyfill/stable'
import 'core-js'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { Provider } from 'react-redux'
import store from './store'
import firebase from 'firebase/compat/app'

// Use your config values here.
firebase.initializeApp({
  apiKey: 'AIzaSyAEfN8F6VGda3RBdSoo5L61oYEbCt8_nZA',
  authDomain: 'covigilence-e6cb0.firebaseapp.com',
  databaseURL: 'https://covigilence-e6cb0-default-rtdb.firebaseio.com',
  projectId: 'covigilence-e6cb0',
  storageBucket: 'covigilence-e6cb0.appspot.com',
  messagingSenderId: '646156017434',
  appId: '1:646156017434:web:1570fa18c84f2613d156a3',
})

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
