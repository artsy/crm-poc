const express = require('express')
const next = require('next')
const session = require('express-session')
const setupAuth = require('./lib/auth')

const { PORT, APP_URL, SESSION_SECRET } = process.env
const port = Number(PORT) || 3000
const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev })
const handle = nextApp.getRequestHandler()

const main = async () => {
  await nextApp.prepare()
  const expressApp = express()

  expressApp.use(
    session({
      secret: SESSION_SECRET,
      resave: false,
      saveUninitialized: true
    })
  )
  setupAuth(expressApp)

  expressApp.get('*', (req, res) => {
    handle(req, res)
  })

  expressApp.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on ${APP_URL}`)
  })
}

main().catch(console.error.bind(console))
