import React from 'react'

const Zone1 = React.lazy(() => import('./views/dashboard/Zone1'))
const Zone2 = React.lazy(() => import('./views/dashboard/Zone2'))
const Zone3 = React.lazy(() => import('./views/dashboard/Zone3'))
const Upload = React.lazy(() => import('./views/dashboard/Uploads'))

const routes = [
  { path: "/dashboard", name: "Home", component: Zone1 },
  { path: "/zone-1", name: "Zone1", component: Zone1 },
  { path: "/zone-2", name: "Zone2", component: Zone2 },
  { path: "/zone-3", name: "Zone3", component: Zone3 },
  { path: "/upload", name: "upload", component: Upload },
];

export default routes
