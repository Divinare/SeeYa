# SeeYa
=============

API KEY: &key=AIzaSyD1G_IG2lcziaSIQT5m3FCGY2xKSBMssHM

WORKLOG
https://docs.google.com/spreadsheets/d/1UvO3rXq2QNohr4bI80ic2XvOpNPf0sl2WTRqVjmFHtA/edit?usp=sharing

ssh general@37.139.24.156

DEVELOPMENT INSTRUCTIONS

How to run the app locally (Windows):

SETTING UP THE ENVIRONMENT:

- Install node.js https://nodejs.org/
- Clone the project from https://github.com/Divinare/SeeYa
- Open command line and go to the folder where you cloned the project
- When you are in the folder run command:

npm install -g gulp

This install gulp globally to your machine.

- In the same folder run command:

npm install

- Your environment is all set

SETUP DATABASE

- Install postgres, see more detailed instructions from docs/SetupPostgres.txt
- Look for postgre.txt for detailed instructions of how to setup database

RUNNING THE APP:

1. Start the dev server by running:

gulp

This starts the server

On linux this also works:
$(npm bin)/gulp

2. Visit http://localhost:1337


How to add dependencies:
- Edit the file package.json. You can find the dependencies from https://www.npmjs.com/
- Run command npm install


MAC:
Install brew, node, npm:
http://blog.teamtreehouse.com/install-node-js-npm-mac

Install postgresql:
http://exponential.io/blog/2015/02/21/install-postgresql-on-mac-os-x-via-brew/

make postgres start when mac OS loads
launchctl load -w ~/Library/LaunchAgents/homebrew.mxcl.postgresql.plist


Starting up postgres server:
postgres -D /usr/local/var/postgres

### Frontend ###

* React for client side view and controller logic
* React Router for client side routing
* ES6 (via Babel)
* Semantic-UI CSS framework
* LESS for extended styling capabilities
* JQuery
* Webpack for client side CommonJS modules and script concatenation
* Gulp for building and change monitoring
* LiveReload

### Server side backend ###

* Express 4 for server side logic
* Database: PostgreSQL 9.4.4

### Common ###
* Validations for both Frontend & Backend