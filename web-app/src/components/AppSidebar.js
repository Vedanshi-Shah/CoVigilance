import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler } from '@coreui/react'
import CIcon from '@coreui/icons-react'

import { AppSidebarNav } from './AppSidebarNav'

import { logoNegative } from 'src/assets/brand/logo-negative'
import { sygnet } from 'src/assets/brand/sygnet'

import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'
// import logo from '../assets/images/logo.jpeg'

// sidebar nav config
import navigation from '../_nav'

const AppSidebar = () => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)

  return (
    <CSidebar
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: "set", sidebarShow: visible });
      }}
    >
      <CSidebarBrand className="d-none d-md-flex" to="/">
        <div>CoVigilance</div>
        {/* <img src={logo} alt="hi" height={35}/> */}
        {/* <CIcon className="sidebar-brand-full" icon={logoNegative} height={35} /> */}
        {/* <CIcon className="sidebar-brand-narrow" icon={sygnet} height={35} /> */}
      </CSidebarBrand>
      <CSidebarNav>
        <SimpleBar>
          <AppSidebarNav items={navigation} />
          <a
            class="nav-link"
            href="https://vedanshi-shah-covigilance-main-dev-vedanshi-3aho1z.streamlitapp.com/"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              class="nav-icon"
              role="img"
            >
              <path
                fill="var(--ci-primary-color, currentColor)"
                d="M440,464V16H72V464H16v32H496V464Zm-32,0H272V400H240v64H104V48H408Z"
                class="ci-primary"
              ></path>
              <rect
                width="32"
                height="32"
                x="160"
                y="304"
                fill="var(--ci-primary-color, currentColor)"
                class="ci-primary"
              ></rect>
              <rect
                width="32"
                height="32"
                x="240"
                y="304"
                fill="var(--ci-primary-color, currentColor)"
                class="ci-primary"
              ></rect>
              <rect
                width="32"
                height="32"
                x="320"
                y="304"
                fill="var(--ci-primary-color, currentColor)"
                class="ci-primary"
              ></rect>
              <rect
                width="32"
                height="32"
                x="160"
                y="208"
                fill="var(--ci-primary-color, currentColor)"
                class="ci-primary"
              ></rect>
              <rect
                width="32"
                height="32"
                x="240"
                y="208"
                fill="var(--ci-primary-color, currentColor)"
                class="ci-primary"
              ></rect>
              <rect
                width="32"
                height="32"
                x="320"
                y="208"
                fill="var(--ci-primary-color, currentColor)"
                class="ci-primary"
              ></rect>
              <rect
                width="32"
                height="32"
                x="160"
                y="112"
                fill="var(--ci-primary-color, currentColor)"
                class="ci-primary"
              ></rect>
              <rect
                width="32"
                height="32"
                x="240"
                y="112"
                fill="var(--ci-primary-color, currentColor)"
                class="ci-primary"
              ></rect>
              <rect
                width="32"
                height="32"
                x="320"
                y="112"
                fill="var(--ci-primary-color, currentColor)"
                class="ci-primary"
              ></rect>
            </svg>
            Upload
          </a>
        </SimpleBar>
      </CSidebarNav>
    </CSidebar>
  );
}

export default React.memo(AppSidebar)
