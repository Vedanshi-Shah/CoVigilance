import React from 'react'

const Zone1 = React.lazy(() => import('./views/dashboard/Zone1'))
const Zone2 = React.lazy(() => import('./views/dashboard/Zone2'))
const Zone3 = React.lazy(() => import('./views/dashboard/Zone3'))
const Zone4 = React.lazy(() => import('./views/dashboard/Zone4'))

// Notifications
const Alerts = React.lazy(() => import('./views/notifications/alerts/Alerts'))
const Badges = React.lazy(() => import('./views/notifications/badges/Badges'))
const Modals = React.lazy(() => import('./views/notifications/modals/Modals'))
const Toasts = React.lazy(() => import('./views/notifications/toasts/Toasts'))

const routes = [
  { path: '/dashboard', exact: true, name: 'Home', component: Zone1 },
  { path: '/zone-1', name: 'Zone1', component: Zone1 },
  { path: '/zone-2', name: 'Zone2', component: Zone2 },
  { path: '/zone-3', name: 'Zone3', component: Zone3 },
  { path: '/zone-4', name: 'Zone4', component: Zone4 },
  { path: '/notifications', name: 'Notifications', component: Alerts, exact: true },
  { path: '/notifications/alerts', name: 'Alerts', component: Alerts },
  { path: '/notifications/badges', name: 'Badges', component: Badges },
  { path: '/notifications/modals', name: 'Modals', component: Modals },
  { path: '/notifications/toasts', name: 'Toasts', component: Toasts },
]

export default routes
