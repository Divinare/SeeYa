# EventMeetup
=============

DESCRIPTION

EventMeetup brings people together in their commonities and helps them find nearby events specific to their interests. EventMeetup also gives people the opportunity to create and publish their own events!

a [Sails](http://sailsjs.org) application

DEVELOPMENT INSTRUCTIONS

How to run the app locally (Windows):

SETTING UP THE ENVIRONMENT:

- Install node.js https://nodejs.org/
- Open command line and go to the folder where you cloned the project
- When you are in the folder run command:

npm install -g gulp

This install gulp globally to your machine. At least on windows you might have to restart the command prompt after this.

- In the same folder run command:

npm install

- Your environment is all set

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



### Languages / Frameworks / Libraries ###

* Facebook's React for client side view and controller logic
* React Router for client side routing
* ES6 (via Babel)
* CoffeeScript with React sugar (.cjsx)
* Normalize-CSS for normalization of default element styles across browsers
* Semantic-UI CSS framework
* LESS for extended styling capabilities
* Autoprefixer for automatic vendor prefixing
* JQuery because semantic wants it (use React for most client side view rendering / manipulation)
* Webpack for client side CommonJS modules and script concatenation
* Express for server side logic
* Gulp for building and change monitoring
* LiveReload

### Development Notes ###

* Client side scripts are concatenated using Webpack.  The main entry point is client.cjsx.  From here you can require() other .cjsx, .coffee, .jsx, or .js files.
* ES6 is supported in JS and JSX files; these are transpiled to ES5 via Babel.  There's an example of this in ```src/header.jsx```.
* The main stylesheet entry point is styles.less.
* The server entry point is server.coffee.

### LiveReload ###

Install a live reload plugin for your browser (e.g. [RemoteLiveReload for Chrome](https://chrome.google.com/webstore/detail/remotelivereload/jlppknnillhjgiengoigajegdpieppei)) to instantly see your changes in the browser when a client side file (cjsx/coffee/jsx/js/less/css/html) changes.