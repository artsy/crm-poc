import styled, { keyframes } from 'styled-components'
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
const Subheader = styled.h2`
  margin-bottom: ${margins.xs}px;
  ${type('avantgarde', 's-headline')}
`

const Header = styled.h1`
  ${type('garamond', 'l-headline')}
`

const Nav = styled.nav`
  margin: ${margins.m}px 0;
  position: relative;
  &:after {
    content: '.';
    color: transparent;
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    border-bottom: 2px solid ${colors.grayRegular};
  }
`

const NavItem = styled.a`
  padding: ${margins.s}px;
  display: inline-block;
  color: ${colors.graySemibold};
  cursor: pointer;
  ${type('avantgarde', 's-headline')}
  ${props => props.active && `
    color: black;
    border-bottom: 2px solid black;
  `}
`

const Main = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: ${margins.m}px;
`

const Col = styled.div`
  ${props => `
    grid-column-start: ${props.start};
    grid-column-end: ${props.end || props.start};
  `}
`

const ColHeader = styled.h3`
  ${type('garamond', 'headline')}
`

const Label = styled.label`
  display: block;
  margin-bottom: ${margins.xs}px;
  ${type('avantgarde', 's-headline')}
`

const Input = styled.input`
  display: block;
  width: 100%;
  padding: 5px 8px;
  border: 2px solid ${colors.grayRegular};
  color: black;
  outline: none;
  ${type('garamond', 'body')}
`

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`

const Button = styled.button`
  padding: 10px;
  width: 100%;
  background: black;
  color: white;
  cursor: pointer;
  outline: none;
  position: relative;
  ${type('avantgarde', 'body')}
  ${props => props.loading && `
    color: transparent;
    &:after {
      content: '.';
      color: transparent;
      position: absolute;
      left: 50%;
      top: 50%;
      margin-top: -3px;
      margin-left: -10px;
      background: white;
      width: 20px;
      height: 6px;
      animation: ${rotate360} 1.5s linear infinite;
    }
  `}
`

export default class People extends React.Component {
  static async getInitialProps (ctx) {
    const currentUser =
      (ctx.req && ctx.req.user) ||
      (typeof window !== 'undefined' && window.__BOOTSTRAP__.currentUser)
    const { body: person } = await request
      .get(`${ARTSY_URL}/api/v1/user/${ctx.query.id}`)
      .set({ 'X-Access-Token': currentUser.accessToken })
    return { person, currentUser }
  }

  constructor (props) {
    super(props)
    this.state = { person: props.person }
  }

  onSubmit = async e => {
    console.log('submit')
    e.preventDefault()
    this.setState({ saveLoading: true })
    await request
      .put(`${ARTSY_URL}/api/v1/user/${this.state.person.id}`)
      .send(this.state.person)
      .set({ 'X-Access-Token': this.props.currentUser.accessToken })
    this.setState({ saveLoading: false })
  }

  update (attr) {
    return e => {
      const person = { ...this.state.person, [attr]: e.target.value }
      this.setState({ person })
    }
  }

  render () {
    return (
      <Layout>
        <Subheader>Artsy User</Subheader>
        <Header>{this.state.person.name}</Header>
        <Nav>
          <NavItem active>Metadata</NavItem>
          <NavItem>Thread</NavItem>
          <NavItem>Communications</NavItem>
          <NavItem>Interests</NavItem>
          <NavItem>Commercial</NavItem>
        </Nav>
        <Main onSubmit={this.onSubmit} className='form'>
          <Col start='1'>
            <ColHeader>Artsy Account</ColHeader>
          </Col>
          <Col start='2'>
            <Label>Name</Label>
            <Input
              value={this.state.person.name}
              onChange={this.update('name')}
            />
          </Col>
          <Col start='3'>
            <Label>Email</Label>
            <Input
              value={this.state.person.email}
              onChange={this.update('email')}
            />
          </Col>
          <Col start='2' end='4'>
            <br />
            <Button type='submit' loading={this.state.saveLoading}>
              Save
            </Button>
          </Col>
        </Main>
      </Layout>
    )
  }
}
