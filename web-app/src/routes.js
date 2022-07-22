import React from 'react'


const Zone1 = React.lazy(() => import('./views/dashboard/Zone1'))
const Zone2 = React.lazy(() => import('./views/dashboard/Zone2'))
const Zone3 = React.lazy(() => import('./views/dashboard/Zone3'))
const Zone4 = React.lazy(() => import('./views/dashboard/Zone4'))
const Login = React.lazy(() => import('./Login'))
const Register = React.lazy(() => import('./Register'))

const routes = [
  { path: "/dashboard", name: "Home", component: Zone1 },
  { path: "/login", name: "Login", component: Login },
  { path: "/register", name: "Register", component: Register },
  { path: "/zone-1", name: "Zone1", component: Zone1 },
  { path: "/zone-2", name: "Zone2", component: Zone2 },
  { path: "/zone-3", name: "Zone3", component: Zone3 },
  { path: "/zone-4", name: "Zone4", component: Zone4 },
];

export default routes
