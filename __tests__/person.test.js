import { shallow } from 'enzyme'
import React from 'react'
import renderer from 'react-test-renderer'
import Person from '../pages/person'

jest.mock('superagent')
const put = jest.spyOn(require('superagent'), 'put')
const send = jest.spyOn(require('superagent'), 'send')

describe('Person page', () => {
  it('saves changes to a person', () => {
    const person = { name: 'Craig', id: 0 }
    const wrapper = shallow(<Person person={person} />)
    wrapper.find('.form').simulate('submit', { preventDefault () {} })
    expect(put).toHaveBeenCalledWith('undefined/api/v1/user/0')
    expect(send).toHaveBeenCalledWith({ name: 'Craig', id: 0 })
  })
})
