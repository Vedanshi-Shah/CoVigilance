import React, { Component, lazy, Suspense, useState } from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { auth, isLoggedIn } from './firebase'
import './scss/style.scss'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = lazy(() => import('./layout/DefaultLayout'))
const Login = React.lazy(() => import('./Login'))
const Register = React.lazy(() => import('./Register'))

class App extends Component {

  render() {
    return (
        <div>
          <BrowserRouter>
            <Suspense fallback={loading}>
              <Switch>
                <Route path="/login" name="Login"
                  render={(props) => 
                      <Login {...props} />}
                />
                <Route path="/register" name="Register"
                  render={(props) => 
                      <Register {...props} />}
                />
                <Route
                  path="/"
                  render={(props) => isLoggedIn()
                    ? <DefaultLayout {...props} />
                    : <Redirect to="/login" replace />
                  }
                />
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
