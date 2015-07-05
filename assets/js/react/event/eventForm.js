var React = require('react');
var $ = require('jquery');
var URL = require('../../url.js');


var EventForm = React.createClass({


	getInitialState: function() {

		return {

		};

	},
	componentWillMount: function() {

	},

	componentDidMount: function() {

	},
	/*
					<form onSubmit={this.handleSubmit} className="eventForm">
					<input type="text" value={this.state.name}></input>
				</form>

	*/


	render: function(){
		return (
			<div className='container'>
				<h1>Create new event</h1>
				<form className="form-horizontal" role="form">
				    <div className="form-group">
				        <label for="inputName" className="col-sm-2 control-label">Name</label>
				        <div className="col-sm-8">
				            <input type="text" className="form-control" id="inputName" placeholder="Event name" />
				        </div>
				    </div>

				    <div className="form-group">
				        <label for="inputUrl" className="col-sm-2 control-label">URL</label>
				        <div className="col-sm-8">
				            <input type="text" className="form-control" id="inputUrl" value="{{url}}" placeholder="http://www.example.com/" />
				        </div>
				    </div>

				    <div className="form-group">
				        <div className="col-sm-8 col-sm-offset-2">
				            <button id="service-addEndpoint" className="btn btn-primary"><i className="fa fa-check"></i> Create</button>
				        </div>
				    </div>
				</form>

			</div>
			)
	}

});

module.exports = EventForm;


