import React, { Component, lazy, Suspense } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
//import { AuthProvider } from './context/AuthContext'
import './scss/style.scss'
// import firebase from 'firebase'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = lazy(() => import('./layout/DefaultLayout'))

class App extends Component {
  render() {
    return (
        <div>
          <BrowserRouter>
            <Suspense fallback={loading}>
              <Switch>
                <Route path="/" name="Home" render={(props) => <DefaultLayout {...props} />} />
              </Switch>
            </Suspense>
          </BrowserRouter>
          {/* <code>
          <pre>{JSON.stringify(firebaseApp.options, null, 2)}</pre>
        </code> */}
        </div>
    )
  }
}

export default App
