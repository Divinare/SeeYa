var React = require('react');
var DatePicker = require('react-datepicker');
var Select = require('react-select');
var Moment = require('moment')
//var $ = require('jquery-autocomplete-js');

var URL = require('../url.js');
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

	},

    handleNewDateChange: function(date) {
	    this.setState({
	      new_date: date
	    });
    },

	handleTimeChange: function(value){
		this.setState({timeValue: value})
	},

	setCurrentTime: function() {
		var str = Moment().format('HH:mm');
		$('#time').val(str);
	},

	render: function(){
		return (
			<div id="eventForm">
				<div id='leftPane' className='col-xs-0 col-md-3'>
				</div>
				<div id='centerPane' className='col-xs-12 col-md-6'>

					<h1 className="text-center">Create new event</h1>
					<form className='form' role='form'>
						<div className='form-group'>
							<input type='text' className='form-control' id='name' placeholder='Event name'/>
						</div>

						<div className='form-group'>
							<div className='input-group'>
								<input type='text' className='form-control' id='address' placeholder='Address'/>
								<span className="input-group-btn">
									 <button className="btn btn-default" type="button"><i className="glyphicon glyphicon-search"></i></button>
								</span>
							</div>
						</div>

						<div className='form-group'>
							<div className="input-group full-width">
					          <DatePicker
						        key="example3"
						        selected={this.state.new_date}
						        onChange={this.handleNewDateChange}
						        placeholderText="Date: dd:mm:yyyy"
						      />
					        </div>
						</div>

						<div className='form-group'>
							<div className='input-group'>
								<input type='text' className='form-control' id='time' placeholder="Time: hh:mm"/>
								<span className="input-group-btn">
									 <button className="btn btn-default" onClick={this.setCurrentTime} type="button"><i className="glyphicon glyphicon-time"></i></button>
								</span>
							</div>
						</div>

						<div className='form-group'>
							<textArea type='text' className='form-control' id='description' placeholder='Description'/>
						</div>
						<div className="form-group">

				            <button type="submit" className="btn btn-default">Submit</button>
					    </div>
					
					 </form>

				</div>
				<div id='rightPane' className='col-xs-0 col-md-3'>
				</div>
			</div>
		)
	}

});

module.exports = EventForm;

//FORM WITH LABELS
/*
			<div id="eventForm">
				<div id='leftPane' className='col-xs-0 col-md-3'>
				</div>
				<div id='centerPane' className='col-xs-12 col-md-6'>

					<h1 className="centeredHeader">Create new event</h1>
					<form className='form' role='form'>
						<div className='form-group'>
							<label for='name'>Name</label>
							<input type='text' className='form-control' id='name'/>
						</div>

						<div className='form-group'>
							<label for='address'>Address</label>
							<div className='input-group'>
								<input type='text' className='form-control' id='address'/>
								<span className="input-group-btn">
									 <button className="btn btn-default" type="button"><i className="glyphicon glyphicon-search"></i></button>
								</span>
							</div>
						</div>

						<div className='form-group'>
							<label for='date'>Date</label>
							<div className="input-group">
					          <DatePicker
						        key="example3"
						        selected={this.state.new_date}
						        onChange={this.handleNewDateChange}
						        placeholderText="Date: dd:mm:yyyy"
						      />
					        </div>
						</div>

						<div className='form-group'>
							<label for='time'>Time</label>
							<div className='input-group'>
								<input type='text' className='form-control' id='time' placeholder="hh:mm"/>
								<span className="input-group-btn">
									 <button className="btn btn-default" type="button"><i className="glyphicon glyphicon-time"></i></button>
								</span>
							</div>
						</div>

						<div className='form-group'>
							<label for='description'>Description</label>
							<input type='text' className='form-control' id='description'/>
						</div>
						<div className="form-group">

				            <button type="submit" className="btn btn-default">Submit</button>
					    </div>
					
					 </form>
				</div>
				<div id='rightPane' className='col-xs-0 col-md-3'>
				</div>
			</div>*/