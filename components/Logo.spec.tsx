import React from 'react'
import { mount } from 'enzyme'
import Logo from './Logo'

describe('Logo', () => {
  const wrapper = mount(<Logo />)

  it('should render without throwing an error', () => {
    expect(wrapper.find('span').text()).toBe('^BUFF')
  })
})
