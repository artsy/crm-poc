import styled from 'styled-components'
import request from 'superagent'
import Link from 'next/link'
import Layout from '../components/layout'
import { type, margins, colors } from '../components/styles'

const { ARTSY_URL } = process.env

const List = styled.ul`
  list-style: none;
  border-top: 1px solid ${colors.grayRegular};
`

const Item = styled.li`
  border-bottom: 1px solid ${colors.grayRegular};
  padding: ${margins.s}px 0;
`

export const fetchPeople = async ctx => {
  const currentUser =
    (ctx.req && ctx.req.user) ||
    (typeof window !== 'undefined' && window.__BOOTSTRAP__.currentUser)
  const { body: people } = await request
    .get(`${ARTSY_URL}/api/v1/users`)
    .set({ 'X-Access-Token': currentUser.accessToken })
  return people
}

export default class People extends React.Component {
  static async getInitialProps (ctx) {
    const people = await fetchPeople(ctx)
    return { people }
  }

  render () {
    const { people } = this.props
    return (
      <Layout>
        <List>
          {people.map(person => (
            <Item key={person.id}>
              <Link href={{ pathname: '/person', query: { id: person.id } }}>
                <a className='person'>{person.name}</a>
              </Link>
            </Item>
          ))}
        </List>
      </Layout>
    )
  }
}
