var EventFormDropdown = React.createClass({
    getInitialState: function() {
        return {
            listVisible: false
        };
    },

    componentDidMount: function() {
        this.setState({
            divId: this.props.divId
        })
        $("#categoryEventForm").keydown(function(e) {
           e.preventDefault();
           return false;
        });
        $(".eventFormListRow").click(function(e) {
            e.preventDefault();
            return false;
        });

    },

    select: function(item) {
        this.selectNoToggle(item);
        this.toggleShowCategories();
    },

    selectNoToggle: function(name){
        this.props.selectCategory(name);
        $("#categoryEventForm").val(name);
    },

    toggleShowCategories: function(e) {
        var id = "categoryContentEventform"
        if($("#" + id).css('display') == 'none') {
            $("#" + id).slideDown(150, function(){ });
        } else {
            $("#" + id).slideUp(150, function(){ });
        }
    },

    renderListItemsMultipleColumns: function() {
        var _this = this;
        var items = [];
        var list = this.props.list;
        for(var i = 0; i < list.length; i += 2) {

            var itemLeft = list[i];
            var leftDiv = <span key={itemLeft.name} className={this.props.itemClassName} onClick={_this.select.bind(null, itemLeft.name)}>{itemLeft.name}</span>;
            var rightDiv;
            if(i+1 < list.length) {
                var itemRight = list[i+1];
                rightDiv = <span key={itemRight.name} className={this.props.itemClassName} onClick={_this.select.bind(null, itemRight.name)}>{itemRight.name}</span>;
            }
            items.push(
                <div key={i+"eventFormRow"} className="eventFormListRow">
                        {leftDiv}
                        {rightDiv}
                </div>);
        };
        return items;
    },

    render: function() {

        var listItems = this.renderListItemsMultipleColumns();

        return (
            <div id="categoryDropdownEventform">
                <div id="categoryContentEventform">
                    {listItems}
                </div>
                <input type='text' className='form-control' id='categoryEventForm' onClick={this.toggleShowCategories} placeholder='Click to select' />
            </div>
        );
    }
});

module.exports = EventFormDropdown;