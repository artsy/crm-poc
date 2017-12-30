import styled from 'styled-components'
import { sidebarWidth, type, colors } from './styles'
import Link from 'next/link'

const Logomark = styled.div`
  color: white;
  display: inline-block;
  padding: 20px;
  ${type('avantgarde', 'm-headline')}
`

const Container = styled.div`
  background: black;
  width: ${sidebarWidth}px;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  ${type('avantgarde', 'body')}
`

const Nav = styled.nav`
  border-top: 1px solid ${colors.grayBold};
  color: white;
`

const NavItem = styled.div`
  border-bottom: 1px solid ${colors.grayBold};
  display: block;
  padding: 20px;
`

const Img = styled.img`
  display: inline-block;
  vertical-align: middle;
  margin-right: 5px;
  margin-top: -3px;
`

export const Sidebar = () => (
  <Container>
    <Logomark>
      <Img width='30' src='static/logomark.svg' /> CRM
    </Logomark>
    <Nav>
      <NavItem><Link href='/'>Home</Link></NavItem>
      <NavItem><Link href='/people'>People</Link></NavItem>
      <NavItem><Link href='/import'>Import</Link></NavItem>
      <NavItem><Link href='/feeds'>Fees</Link></NavItem>
      <NavItem><Link href='/logout'>Logout</Link></NavItem>
    </Nav>
  </Container>
)
