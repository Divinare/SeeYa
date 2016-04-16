import { browserHistory, Link } from 'react-router';
var React = require('react');

var fieldLengths = require('../../common/validators/fieldLengths.js');
var commonUtils = require('../../common/utils.js');
var commonValidator = require('../../common/validators/validator.js');
var validator = UTILS.validator;

var ContactUs = React.createClass({
    getInitialState: function() {

        return {
            subjectId: "",
            email: "",
            description: ""
        };
    },
    componentWillMount: function() {

    },

    componentDidMount: function() {

    },

    maxLengthForDesription: function() {
        var description = $("#description").val();
        if(typeof description == "undefined") {
            return;
        }
        if(description.length == 0) {
            $("#charactersLeft").css("display", "none");
        } else {
            var charactersLeft = fieldLengths.contactDescriptionMaxLength - description.length;
            if(charactersLeft < 0) {
                charactersLeft = 0;
            }
            $("#charactersLeft").text("Characters left: " + charactersLeft);
            $("#charactersLeft").css("display", "block");
        }
        
        var lineHeight = parseInt($('#description').css('lineHeight'),10);
        if(description.length === 0) {
            $('#description').css("height", 3*lineHeight);
            return;
        }

        this.descriptionAutoresize();
    },

    descriptionAutoresize: function() {
        var description = $("#description").val();
        if(typeof description == "undefined") {
            return;
        }
        var lineHeight = parseInt($('#description').css('lineHeight'),10);
        if(description.length === 0) {
            $('#description').css("height", 3*lineHeight);
            return;
        }
        
        if(typeof $('#description')[0] !== "undefined") {
            var linesCount = $('#description')[0].scrollHeight / lineHeight;
            var currentHeight = $('#description')[0].clientHeight;
            var newHeight = linesCount*lineHeight;
            if(currentHeight < newHeight) {
                $('#description').css("height", newHeight);
            }
        }
    },

    // Called when a field is changed
    handleChange: function(key) {
        if(key == "description") {
            this.maxLengthForDesription();
        }

       return function (e) {
           var state = {};
           state[key] = e.target.value;
           this.setState(state);
       }.bind(this);
    },

    handleSubmit: function() {

        var validSubject = validator.validateField(commonValidator.validateContactSubject, 
                                            this.state.subjectId,
                                            "#subject",
                                            "#subjectError"
                                            );

        var validEmail = validator.validateField(commonValidator.validateContactEmail, 
                                            this.state.email,
                                            "#email",
                                            "#emailError"
                                            );

        var validDescription = validator.validateField(commonValidator.validateContactDescription, 
                                            this.state.description,
                                            "#description",
                                            "#descriptionError"
                                            );


        if(!validSubject || !validEmail || !validDescription) {
            console.log("... Form was not valid, validSubject: " + validSubject + " validEmail: " + validEmail + " validDescription: " + validDescription);
            return;
        }
        console.log("Sending contact information")
        var contactData = {
            subjectId: this.state.subjectId,
            email: this.state.email,
            description: this.state.description,
        }
        var error = function( jqXhr, textStatus, errorThrown){
            console.log("error")
            console.log( errorThrown );
            console.log(jqXhr)
            console.log(jqXhr.responseJSON)

           // $('#serverErrorDiv').show(500);

        };
        var success = function(result){
            console.log("SUCCESSS!!!");
            browserHistory.push('/');

        };
       // $("#serverErrorDiv").hide(200);
       // validator.clearErrorFromField('email', 'emailError');
        UTILS.rest.addEntry('contact', contactData, success, error);

    },

    render: function(){
        return (
            <div id="contactUsContainer">
                <h2 id="contactusTopic">Contact us</h2>
                <p>Send email to gatherup@gmail.com</p>
                <div className="form-group">
                        <label className="control-label">Subject *</label>
                            <input type="text" id="subject" placeholder="Click to select" className="form-control" onChange={this.handleChange('subjectId')}/>
                            <span id="subjectError"></span>
                    </div>
                    <div className="form-group">
                        <label className="control-label">Email</label>
                            <input type="text" id="email" placeholder="(optional)" className="form-control" onChange={this.handleChange('email')}/>
                            <span id="emailError"></span>
                    </div>
                    <div className="form-group">
                        <label className="control-label">Description *</label>
                        <div className='form-group'>
                            <textarea type='text' className='form-control' id='description' maxLength="500" value={this.state.description} onChange={this.handleChange('description')} placeholder="Description"/>
                        </div>
                        <span id="charactersLeft"></span>
                    </div>

                    <div className="form-group">
                        <button className="btn btn-default" onClick={this.handleSubmit}>Submit</button>
                    </div>

                </div>
            )
    }

});

module.exports = ContactUs;