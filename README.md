# crm-poc

Proof of concept codebase and docs for a CRM Admin UI.

## Setup

Make sure to have the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli), [NVM](https://github.com/creationix/nvm), Node 8, and Yarn (you probably already have this if you've worked with Artsy's other Node apps).

```
brew install heroku/brew/heroku
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash
nvm install 8 && alias default 8
npm i -g yarn
```

Then install dependencies, copy over a .env file, and start the server.

```
yarn install
yarn env
yarn start
```
