var Dropdown = React.createClass({
    getInitialState: function() {
        return {
            listVisible: false
        };
    },

    componentDidMount: function() {
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


    renderListItemsMultipleColumns: function() {
        var _this = this;
        var items = [];
        var list = this.props.list;
        for(var i = 0; i < list.length; i += 2) {
            var itemLeft = list[i];
            console.log("left: " + itemLeft.name);

            var leftDiv = <span key={itemLeft.name} className="itemDropdownEventList itemRightDropdownEventList" onClick={_this.select.bind(null, itemLeft.name)}><div>{itemLeft.name}</div></span>;
            var rightDiv;
            if(i+1 < list.length) {
                var itemRight = list[i+1];
                console.log("right: " + itemRight.name);
                rightDiv = <span key={itemRight.name} className="itemDropdownEventList itemRightDropdownEventList" onClick={_this.select.bind(null, itemRight.name)}><div>{itemRight.name}</div></span>;
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

        var listItems = this.renderListItemsMultipleColumns();


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