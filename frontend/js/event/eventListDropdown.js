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
        console.log("change filter value to " + name)
        this.props.updateAppStatus()

        var eventListData = this.props.eventListData;
        var currentVal = eventListData['filters'][name]
        eventListData['filters'][name] = !currentVal;
        console.log(eventListData);
        this.props.updateAppStatus('eventListData', eventListData);
    },


    renderListItemsMultipleColumns: function() {
        var _this = this;
        var items = [];
        var list = this.props.list;
        var eventListData = this.props.eventListData;
        var filtersArray = eventListData['filters'];
        console.log("FILTERS #¤£@@@@@@@@@@@@@@@@@22");
        console.log(filtersArray);

        for(var i = 0; i < list.length; i += 2) {
            var itemLeft = list[i];
            var filterLeftValue = filtersArray[itemLeft.name];
            console.log("left: " + itemLeft.name);
            console.log("VALUE???? " + filterLeftValue)

            var leftDiv = <div key={itemLeft.name} className="itemDropdownEventList itemRightDropdownEventList" onClick={_this.changeFilterValue.bind(null, itemLeft.name)}>
                <div>
                    <input className="eventListDropdownCheckbox" type="checkbox"
                      checked={filterLeftValue}
                      onClick={this.changeFilterValue.bind(null, itemLeft.name)}
                      value={filterLeftValue} />

                    {itemLeft.name}
                </div>
            </div>;
            var rightDiv;
            if(i+1 < list.length) {
                var itemRight = list[i+1];
                var filterRightValue = filtersArray[itemRight.name];
                console.log("right: " + itemRight.name);
                rightDiv = <div key={itemRight.name} className="itemDropdownEventList itemRightDropdownEventList" onClick={_this.changeFilterValue.bind(null, itemRight.name)}>
                   <div>
                        <input className="eventListDropdownCheckbox" type="checkbox"
                          checked={filterRightValue}
                          onClick={this.changeFilterValue.bind(null, itemRight.name)}
                          value={filterRightValue} />

                        {itemRight.name}
                    </div>
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