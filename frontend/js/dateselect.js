var Dateselect = React.createClass({
    getInitialState: function() {
        return {
            listVisible: false
        };
    },

    select: function(date) {
        this.props.selectDate(date);
    },

    _destroyDatePicker: function() {
      //  var element = this.getDOMNode();
        var element = React.findDOMNode(this);

        $("datepicker").datepicker('destroy');
    },

    _initDatePicker: function() {
        //var element = this.getDOMNode();
        // or in >= 0.13 
        var element = React.findDOMNode(this);
        $("datepicker").datepicker(this.props);    
    },

    componentDidMount: function() {
        this._initDatePicker();
    },

    toggleShowCategories: function(e) {
        console.log("at toggle");
       // var categoriesContent = $("#dateSelectDiv")[0];
        if($("#dateSelectDiv").css('display') == 'none') {
            $("#dateSelectDiv").slideDown(150, function(){ });
        } else {
            $("#dateSelectDiv").slideUp(150, function(){ });
        }
    },

    renderListItems: function() {
        var _this = this;
        var items = [];
        console.log("LIST LENGTH: " +  this.props.list.length);
        this.props.list.map(function(item) {
            console.log("ITEM NAME: " + item.name);
            items.push(
                <div className="item unSelected" onClick={_this.select.bind(null, item.name)}>{item.name}
            </div>);
        });
        return items;
    },

    render: function() {

        return (
            <div className="eventList-date-select">
                <div id="datepicker"></div>
                <div id={this.props.selectDivId}>{this.props.defaultValue}</div>
            </div>
        );
    }

});

module.exports = Dateselect;