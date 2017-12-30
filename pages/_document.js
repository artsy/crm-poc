import Document, { Head, Main, NextScript } from 'next/document'
import flush from 'styled-jsx/server'

export default class MyDocument extends Document {
  static getInitialProps (ctx) {
    const { html, head, errorHtml, chunks } = ctx.renderPage()
    const styles = flush()
    return { html, head, errorHtml, chunks, styles, currentUser: ctx.req.user }
  }

  render () {
    const currentUser = JSON.stringify(this.props.currentUser)
    return (
      <html>
        <Head />
        <body>
          {this.props.customValue}
          <Main />
          <NextScript />
          <script
            dangerouslySetInnerHTML={{
              __html: `window.__BOOTSTRAP__ = { currentUser: ${currentUser} }`
            }}
          />
        </body>
      </html>
    )
  }
}
