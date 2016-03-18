var React = require('react');

const About = React.createClass({


	getInitialState: function() {

		return {

		};

	},
	componentWillMount: function() {

	},

	componentDidMount: function() {
        this.props.handleResize();
	},


	render: function(){

		// <img src="savimaja.png" alt="Mountain View" style="width:100px;height:88px;" />


		return (

			<div className='right-container'>
				
<img className="imghomeicon" src="assets/savimaja.png" alt="Mountain View"/>

<br />
<br />
<br />
<br />
				<h1>About page comes here</h1>


				
				
				

				<p>Hello world</p>
				<p>Hello world</p>


			</div>
			)
	}

});

module.exports = About;