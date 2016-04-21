var Dropdown = React.createClass({
    getInitialState: function() {
        return {
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

        // Now update Show all markers status, mark as true if all categories are checked, otherwise false
        var allFiltersTrue = true;
        for(var filter in eventListData['filters']) {
            if(!eventListData['filters'][filter]) {
                allFiltersTrue = false;
            }
        }
        this.props.setShowAllCategories(allFiltersTrue);

    },

    renderListItemsMultipleColumns: function() {
        var items = [];
        var list = this.props.list;
        var filtersArray = this.props.eventListData['filters'];

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
                <div key={i+"eventFormRow"} className="eventListDropdownRow">
                        {leftDiv}
                        {rightDiv}
                </div>);
        };
        return items;
    },

    isAllCategoriesSelected: function() {
        var filtersArray = this.props.eventListData['filters'];
        for(var filter in filtersArray) {
            if(!filtersArray[filter]) {
                return false;
            }
        }
        return true;
    },

    renderSelectAllOption: function() {
        this.isAllCategoriesSelected();
        var selectAllOption = <div id="showAllCategories" className="eventListDropdownRow">
            <div className="eventListDropdownSelectAllContainer" onClick={this.toggleAllCategories}>
                <input className="eventListDropdownSelectAllCheckbox" type="checkbox"
                  checked={this.isAllCategoriesSelected()}
                  onChange={function(){}}
                  value={this.isAllCategoriesSelected()} />
                  <span className="eventListDropdownSelectAllTextField">Show all categories</span>
            </div>
        </div>
        return selectAllOption;

    },

    toggleAllCategories: function() {
        if(this.props.showAllCategories) {
            this.props.showOrHideAllCategories(false);
        } else {
            this.props.showOrHideAllCategories(true);
        }
    },


    render: function() {
        var listItems;
        var selectAllOption;
        if(typeof this.props.list !== "undefined") {
            listItems = this.renderListItemsMultipleColumns();
            selectAllOption = this.renderSelectAllOption();
        } else {
            listItems = <span></span>;
            selectAllOption = <span></span>;
        }


        return (

            <div id="eventListDropdown">
                <div id="categoriesContentEventList">
                    {selectAllOption}
                    {listItems}
                </div>

                <div id="category" className="dropdownBtnEventList" onClick={this.toggleShowCategories}>Categories</div>
            </div>
            
        );
    }
});

module.exports = Dropdown;