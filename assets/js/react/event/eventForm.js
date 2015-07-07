var React = require('react');
var DatePicker = require('react-datepicker');
var Select = require('react-select');
//var $ = require('jquery-autocomplete-js');

var b = require('react-bootstrap');
var Glyphicon = b.Glyphicon;
var URL = require('../../url.js');
var clock24hour = require('../utils/clocktimes.js').hour24;


var EventForm = React.createClass({


  getInitialState: function() {
    return {
      new_date: null,
      timeValue: '14:00'
    };
  },
	componentWillMount: function() {

	},

	componentDidMount: function() {

			/* var ac = $('#time').autocomplete({
			  options: ["apple", "bannana", "strawberry", "pineapple"]
			});
	*/
	},

    handleNewDateChange: function(date) {
	    this.setState({
	      new_date: date
	    });
    },

	handleTimeChange: function(value){
		this.setState({timeValue: value})
	},

	render: function(){
		return (
			<div className="container">
				<h1>Create new event</h1>
				<form className='form-horizontal' role="form">
				    <div className="form-group">
				        <label className="col-sm-2 control-label">Name</label>
				        <div className="col-sm-8">
				            <input type="text" className="form-control" placeholder="Event name" />
				        </div>
				    </div>

				    <div className="form-group">
				        <label className="col-sm-2 control-label">Address</label>
				        <div className="col-sm-8">
				            <input type="text" className="form-control" value="" placeholder="Address" />
				                            <span className="input-group-btn">
                    <button className="btn btn-default" type="button"><i className="glyphicon glyphicon-search"></i></button>
                </span>
				        </div>
				    </div>

				    <div className="form-group">
				    <label className="col-sm-2 control-label">Date</label>
				        <div className="col-sm-8">
				          <DatePicker
					        key="example3"
					        selected={this.state.new_date}
					        onChange={this.handleNewDateChange}
					        placeholderText="Click to select a date"
					      />
				        </div>
					</div>

				    <div className="form-group">
				    <label className="col-sm-2 control-label">Time</label>
				        <div className="col-sm-8">
  							<input id="time" className="form-control" placeholder="hh:mm" />
				        </div>
					</div>

				    <div className="form-group">
				        <label className="col-sm-2 control-label">Description</label>
				        <div className="col-sm-8">
				            <input type="text" className="form-control" value="" placeholder="Description" />
				        </div>
				    </div>

				    <div className="form-group">
				        <div className="col-sm-8 col-sm-offset-2">
				            <button type="submit" className="btn btn-default">Submit</button>
				        </div>
				    </div>
				    <button className="glyphicon glyphicon-time"></button>

				</form>

			</div>
			)
	}

});

module.exports = EventForm;


