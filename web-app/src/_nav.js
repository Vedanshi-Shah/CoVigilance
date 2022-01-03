import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilBuilding } from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavTitle,
    name: 'Zones',
  },
  {
    component: CNavItem,
    name: 'Zone-1',
    to: '/zone-1',
    icon: <CIcon icon={cilBuilding} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Zone-2',
    to: '/zone-2',
    icon: <CIcon icon={cilBuilding} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Zone-3',
    to: '/zone-3',
    icon: <CIcon icon={cilBuilding} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Zone-4',
    to: 'zone-4',
    icon: <CIcon icon={cilBuilding} customClassName="nav-icon" />,
  },
]

export default _nav
