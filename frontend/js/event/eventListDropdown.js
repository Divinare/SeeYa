var Dropdown = React.createClass({
    getInitialState: function() {
        return {
            listVisible: false
        };
    },

    componentDidMount: function() {
        //this.props.list

        this.setState({
            divId: this.props.divId
        })
        $('.eventListDropdownCheckbox').click(function(event) {
            event.preventDefault();
         });
    },

    select: function(item) {
        this.props.selectCategory(item);
        this.toggleShowCategories();
        $("#category").val(item);
    },

    toggleShowCategories: function(e) {
        var id = "categoriesContentEventList";
        if($("#" + id).css('display') == 'none') {
            $("#" + id).slideDown(150, function(){ });
        } else {
            $("#" + id).slideUp(150, function(){ });
        }
    },

    changeFilterValue: function(name) {
        var eventListData = this.props.eventListData;
        var currentVal = eventListData['filters'][name]
        eventListData['filters'][name] = !currentVal;
        this.props.updateAppStatus('eventListData', eventListData);
        this.props.getEvents();
    },

    renderListItemsMultipleColumns: function() {
        var items = [];
        var list = this.props.list;
        var eventListData = this.props.eventListData;
        var filtersArray = eventListData['filters'];

        for(var i = 0; i < list.length; i += 2) {
            var itemLeft = list[i];
            var filterLeftValue = filtersArray[itemLeft.name];

            var leftDiv = <div key={itemLeft.name} className="itemDropdownEventList" onClick={this.changeFilterValue.bind(null, itemLeft.name)}>
                <input className="eventListDropdownCheckbox" type="checkbox"
                  checked={filterLeftValue}
                  onChange={function(){}}
                  value={filterLeftValue} />

                <div className="eventListItemCategoryName">{itemLeft.name}</div>
            </div>;
            var rightDiv;
            if(i+1 < list.length) {
                var itemRight = list[i+1];
                var filterRightValue = filtersArray[itemRight.name];
                rightDiv = <div key={itemRight.name} className="itemDropdownEventList" onClick={this.changeFilterValue.bind(null, itemRight.name)}>
                    <input className="eventListDropdownCheckbox" type="checkbox"
                      checked={filterRightValue}
                      onChange={function(){}}
                      value={filterRightValue} />

                    <div className="eventListItemCategoryName">{itemRight.name}</div>
                </div>;
            } else {
                rightDiv = <span></span>
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
        var listItems;
        if(typeof this.props.list !== "undefined") {
            listItems = this.renderListItemsMultipleColumns();
        } else {
            listItems = <span></span>
        }


        return (

            <div id={this.props.dropdownId}>
                <div id="categoriesContentEventList">
                    {listItems}
                </div>

                <div id="category" className="dropdownBtnEventList" onClick={this.toggleShowCategories}>Categories</div>
            </div>
            
        );
    }
});

module.exports = Dropdown;