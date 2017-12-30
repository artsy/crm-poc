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

export default class People extends React.Component {
  static async getInitialProps (ctx) {
    const currentUser =
      (ctx.req && ctx.req.user) ||
      (typeof window !== 'undefined' && window.__BOOTSTRAP__.currentUser)
    const { body: person } = await request
      .get(`${ARTSY_URL}/api/v1/user/${ctx.query.id}`)
      .set({ 'X-Access-Token': currentUser.accessToken })
    return { person }
  }

  render () {
    const { person } = this.props
    return (
      <Layout>
        <h1>{person.name}</h1>
      </Layout>
    )
  }
}
