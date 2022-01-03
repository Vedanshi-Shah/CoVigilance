import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter>
      <div>
        <span className="ms-1">Made by Team CodeForce</span>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
