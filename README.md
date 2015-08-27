# EventMeetup
=============

DEVELOPMENT INSTRUCTIONS

How to run the app locally (Windows):

SETTING UP THE ENVIRONMENT:

- Install node.js https://nodejs.org/
- Clone the project from https://github.com/Divinare/EventMeetup
- Open command line and go to the folder where you cloned the project
- When you are in the folder run command:

npm install -g gulp

This install gulp globally to your machine. At least on windows you might have to restart the command prompt after this.

- In the same folder run command:

npm install

- Your environment is all set

- Install postgres, see more detailed instructions from docs/SetupPostgres.txt

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