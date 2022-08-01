import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilBuilding, cilVideo } from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Upload',
    to: 'Upload',
    icon: <CIcon style={{ marginRight : "20px" }} icon={cilVideo} size="lg"
  />,
  },
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
]

export default _nav
