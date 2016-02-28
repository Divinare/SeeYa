var DatePicker = React.createClass({
    _destroyDatePicker: function() {
        //var element = this.getDOMNode();
       // var element = React.findDOMNode(this);
        //$(element).datepicker('destroy');

    },

    _initDatePicker: function() {
      //  var element = ReactDOM.getDOMNode();
        // or in >= 0.13 
        //var element = React.findDOMNode(this);
        //console.log(element);
        //$j(element).datepicker(this.props);    
    },

    //componentDidMount: function() {
   //     this._initDatePicker();
   // },
    
    componentDidMount: function() {
        /*
        console.log($('.datepicker'));
        var element = React.findDOMNode(this);
        $(element).datepicker();
        console.log("ELEMENT:");
        console.log(element);
        //$('.datepicker').datepicker();
        */
    },

    componentWillReceiveProps: function(props) {
        // could be optimized better to invoke functions on
        // active plugin based on property values
        this._destroyDatePicker();
    },

    componentDidUpdate: function() {
        this._initDatePicker();
    },

    componentWillUnmount: function() {
        this._destroyDatePicker();
    },

    render: function() {
        return <input type="text" {...this.props} className="datepicker" />
    }
});

module.exports = DatePicker;