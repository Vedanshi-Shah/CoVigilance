import React from 'react'
import { shallow } from 'enzyme/build'
import App from './App'
import Dashboard from './views/dashboard/Zone1.js'

it('mounts App without crashing', () => {
  const wrapper = shallow(<App />)
  wrapper.unmount()
})

it('mounts Dashboard without crashing', () => {
  const wrapper = shallow(<Dashboard />)
  wrapper.unmount()
})
