var React = require('react');
var DatePicker = require('react-datepicker');
var Select = require('react-select');

//var jquery = require('jquery-autocomplete-js');
var URL = require('../../url.js');
var clock24hour = require('../utils/clocktimes.js').hour24;

var asd = [
      "ActionScript",
      "AppleScript",
      "Asp",
      "BASIC",
      "C",
      "C++",
      "Clojure",
      "COBOL",
      "ColdFusion",
      "Erlang",
      "Fortran",
      "Groovy",
      "Haskell",
      "Java",
      "JavaScript",
      "Lisp",
      "Perl",
      "PHP",
      "Python",
      "Ruby",
      "Scala",
      "Scheme"
    ];

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
		console.log(asd);
			var ac = jquery('#time').autocomplete({
			  options: ["apple", "bannana", "strawberry", "pineapple"]
			});
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
			<div className='container'>
				<h1>Create new event</h1>
				<form className="form-horizontal" role="form">
				    <div className="form-group">
				        <label className="col-sm-2 control-label">Name</label>
				        <div className="col-sm-8">
				            <input type="text" className="form-control" id="inputName" placeholder="Event name" />
				        </div>
				    </div>

				    <div className="form-group">
				        <label className="col-sm-2 control-label">URL</label>
				        <div className="col-sm-8">
				            <input type="text" className="form-control" id="inputUrl" value="{{url}}" placeholder="http://www.example.com/" />
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
  								<input id="time" />
				        </div>
					</div>

				    <div className="form-group">
				        <div className="col-sm-8 col-sm-offset-2">
				            <button type="submit" className="btn btn-default">Submit</button>
				        </div>
				    </div>







				</form>

			</div>
			)
	}

});

module.exports = EventForm;


