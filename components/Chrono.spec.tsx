import React from 'react'
import { mount } from 'enzyme'

import Chrono from './Chrono'

const props = {
  timeToShow: 1,
}

jest.useFakeTimers()

describe('Chrono', () => {
  const wrapper = mount(<Chrono {...props} />)

  it('should render and start the countdown', () => {
    expect(wrapper.find('span').text()).toBe('1')
    jest.advanceTimersByTime(1000)
    expect(wrapper.find('span').text()).toBe('0')
  })
})
