import styled from 'styled-components'
import { reset } from './reset'
import { Sidebar } from './sidebar.js'
import Head from 'next/head'
import { sidebarWidth, margins } from './styles'

const Main = styled.div`
  margin-left: ${sidebarWidth}px;
  min-height: 100vh;
  width: calc(100vw - ${sidebarWidth + margins.l * 2}px);
  padding: ${margins.l}px;
`

export default ({ children }) => (
  <div>
    <Head>
      <link
        type='text/css'
        rel='stylesheet'
        href='https://webfonts.artsy.net/force-webfonts.css?a=b'
      />
    </Head>
    <style>{reset}</style>
    <Sidebar />
    <Main>
      {children}
    </Main>
  </div>
)
