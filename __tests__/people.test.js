import { shallow } from 'enzyme'
import React from 'react'
import renderer from 'react-test-renderer'
import People from '../pages/people'

jest.mock('superagent')
const spy = jest.spyOn(require('superagent'), 'get')

describe('People page', () => {
  it('shows peoples names', () => {
    const people = [{ name: 'Craig', id: 0 }]
    const component = shallow(<People people={people} />)
    expect(component.find('.person').props().children).toEqual('Craig')
  })

  it('fetches people on boot', async () => {
    const user = { name: 'Craig', id: 0, accessToken: 'foo' }
    const props = await People.getInitialProps({ req: { user } })
    expect(spy).toHaveBeenCalledWith('undefined/api/v1/users')
  })
})
