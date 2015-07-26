var React = require('react');

var Html = React.createClass({
  render: function () {
    return (
      <html>
        <head>
          <title>{this.props.props.title}</title>
          <link rel='stylesheet' type='text/css' href='/stylesheets/style.css' />
        </head>
        <body>
            <div id='view' dangerouslySetInnerHTML={{__html: this.props.body}} />
            <script type='application/json' dangerouslySetInnerHTML={{__html: JSON.stringify(this.props.props)}} />
            <script src='/javascripts/bundle.js' />
        </body>
      </html>
    );
  }
});

module.exports = Html;