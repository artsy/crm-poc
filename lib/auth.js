//
// Auth setup code using passport and friends.
// TODO: Extract into an artsy-oauth-passport module
//
const passport = require('passport')
const OAuth2Strategy = require('passport-oauth2')
const request = require('superagent')

const { APP_URL, ARTSY_URL, ARTSY_ID, ARTSY_SECRET } = process.env

const setupPassport = function () {
  passport.use(
    'artsy',
    new OAuth2Strategy(
      {
        authorizationURL: ARTSY_URL + '/oauth2/authorize',
        tokenURL: ARTSY_URL + '/oauth2/access_token',
        clientID: ARTSY_ID,
        clientSecret: ARTSY_SECRET,
        callbackURL: APP_URL + '/auth/artsy/callback'
      },
      async (accessToken, refreshToken, profile, done) => {
        const { body } = await request
          .get(`${ARTSY_URL}/api/v1/me`)
          .set({ 'X-Access-Token': accessToken })
        const user = {
          name: body.name,
          roles: body.roles,
          accessToken
        }
        done(null, user)
      }
    )
  )
  passport.serializeUser((user, done) => {
    done(null, JSON.stringify(user))
  })
  passport.deserializeUser((user, done) => {
    done(null, JSON.parse(user))
  })
}

const requireLoggedIn = (req, res, next) => {
  if (!req.user) res.redirect('/login')
  else next()
}

const logout = (req, res) => {
  req.logout()
  res.redirect('/')
}

const unauthorized = (req, res) => res.send('Unauthorized')

module.exports = app => {
  setupPassport()
  app.use(passport.initialize())
  app.use(passport.session())
  app.get('/login', passport.authenticate('artsy'))
  app.get(
    '/auth/artsy/callback',
    passport.authenticate('artsy', {
      successRedirect: '/',
      failureRedirect: '/unauthorized'
    })
  )
  app.get('/logout', logout)
  app.get('/unauthorized', unauthorized)
  app.use(requireLoggedIn)
}
