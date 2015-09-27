var React = require('react');

var Frontpage = React.createClass({


	getInitialState: function() {

		return {

		};

	},
	componentWillMount: function() {

	},

	componentDidMount: function() {

	},

	swapPage: function() {
		$('#frontpage_bg').slideUp(750);
	},

	backgroundImageLoaded: function() {
		this.props.updateAppStatus('frontpageLoaded', true);
	},

	render: function() {


		return (
			<div className='frontpage'>
				<img id="frontpage_bg" onClick={this.swapPage} src="http://www.cs.helsinki.fi/u/joeniemi/assets/frontpage.png" onLoad={this.backgroundImageLoaded} alt="" />
			</div>
			)
	}

});

module.exports = Frontpage;