var React = require('react');
var Router = require('react-router');
var browserHistory = Router.browserHistory;
var Link = Router.Link;

var SingleSelectDropdown = require('./singleSelectDropdown.js');

var msgComponent = require('./utils/messageComponent.js');
var fieldLengths = require('../../common/validators/fieldLengths.js');
var commonUtils = require('../../common/utils.js');
var commonValidator = require('../../common/validators/validator.js');
var contactSubjects = require('../../common/contactSubjects.js');

var validator = UTILS.validator;

var ContactUs = React.createClass({
    getInitialState: function() {

        var subject = [];

        var subjects = contactSubjects.getContactSubjects();

        return {
            selectedSubject: "",
            email: "",
            description: "",
            subjects: subjects
        };
    },
    componentWillMount: function() {

    },

    componentDidMount: function() {
        this.setToolbarIcons();
    },

    setToolbarIcons: function() {
        var homeFunc = function() {
            browserHistory.push('/');
        }

        var toolbarComponentData = {
            "home": homeFunc
        }
        this.props.updateToolbarIcons(toolbarComponentData);
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


        var subjectId = "";
        var subjects = contactSubjects.getContactSubjects();
        var selectedSubject = this.state.selectedSubject;
        // Get the correct subject id of selectedSubject
        for(var subject in subjects) {
            var subjectObj = subjects[subject];
            if(selectedSubject == subjectObj.name) {
                subjectId = subjectObj.id;
            }
        }

        var email = this.state.email;
        if(email == "") {
            email = null;
        }

        var validSubject = validator.validateField(commonValidator.validateContactSubject, 
                                            subjectId,
                                            "#subject",
                                            "#subjectError"
                                            );

        var validEmail = validator.validateField(commonValidator.validateContactEmail, 
                                            email,
                                            "#email",
                                            "#emailError"
                                            );

        var validDescription = validator.validateField(commonValidator.validateContactDescription, 
                                            this.state.description,
                                            "#description",
                                            "#descriptionError"
                                            );

        console.log("VALID validSubject: " + validSubject);
        console.log("subjectId " + subjectId);
        if(!validSubject || !validEmail || !validDescription) {
            console.log("... Form was not valid, validSubject: " + validSubject + " validEmail: " + validEmail + " validDescription: " + validDescription);
            return;
        }
        console.log("Sending contact information")
        var contactData = {
            subjectId: subjectId,
            email: email,
            description: this.state.description,
        }
        var error = function( jqXhr, textStatus, errorThrown){
            console.log("error")
            console.log( errorThrown );
            console.log(jqXhr)
            console.log(jqXhr.responseJSON)

           // $('#serverErrorDiv').show(500);

        };
        var success = function(result) {
            var message;
            if(subjectId == 1) {
                message = "Thanks for giving us some feedback!"
            } else {
                message = "Thanks for contacting us!"
            }

            msgComponent.showMessageComponent(message, 5000, 'success')
            browserHistory.push('/');

        };
       // $("#serverErrorDiv").hide(200);
       // validator.clearErrorFromField('email', 'emailError');
        UTILS.rest.addEntry('contact', contactData, success, error);

    },

    selectSubject: function(subject) {
        console.log(subject);
        this.setState({
            selectedSubject: subject
        })
    },

    render: function(){
        return (
            <div id="contactUsContainer">
                <h2 className="topicText">Contact us</h2>
                <p>
                Send email to:
                <a href="mailto:team@seeyaevents.com ?Subject=Hello" target="_top"> team@seeyaevents.com </a>
                </p>
                <div className="form-group">
                        <label className="control-label">Subject *</label>
                            <SingleSelectDropdown
                                multipleColumns={false}
                                inputFieldId={"subject"}
                                list={this.state.subjects}
                                select={this.selectSubject} 
                                selected={this.state.selectedSubject}
                                scrollTopPosition={0} />   
                    </div>
                    <div className="form-group">
                        <label className="control-label">Email</label>
                            <input type="text" id="email" placeholder="(optional)" className="form-control" onChange={this.handleChange('email')} autoComplete="off"/>
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