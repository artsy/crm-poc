import styled from 'styled-components'
import Layout from '../components/layout'
import { type } from '../components/styles'

const Header = styled.h1`
  ${type('garamond', 'l-headline')}
`

export default class Index extends React.Component {
  static getInitialProps (ctx) {
    const currentUser =
      (ctx.req && ctx.req.user) ||
      (typeof window !== 'undefined' && window.__BOOTSTRAP__.currentUser)
    return {
      currentUser
    }
  }

  render () {
    const { currentUser } = this.props
    return (
      <Layout>
        <Header>Welcome to CRM {currentUser.name}</Header>
      </Layout>
    )
  }
}
