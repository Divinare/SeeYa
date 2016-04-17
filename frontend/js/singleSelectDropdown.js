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
        $("#singleSelectInput").keydown(function(e) {
           e.preventDefault();
           return false;
        });
        $(".singleSelectListRow").click(function(e) {
            e.preventDefault();
            return false;
        });

    },

    select: function(item) {
        console.log("AT SELECT !! " + item);
        this.props.select(item);
        $("#singleSelectInput").val(item);
        this.toggleShowCategories();
    },

    toggleShowCategories: function(e) {
        console.log("At toggle!");
        var id = "singleSelectContent";
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
        console.log("LIST:");
        console.log(list);
        for(var i = 0; i < list.length; i += 2) {
            var itemLeft = list[i];

            var leftDiv = <span key={itemLeft.name} className="itemDropdownSingleSelect itemRightDropdownSingleSelect" onClick={_this.select.bind(null, itemLeft.name)}><div>{itemLeft.name}</div></span>;
            var rightDiv;
            if(i+1 < list.length) {
                var itemRight = list[i+1];
                rightDiv = <span key={itemRight.name} className="itemDropdownSingleSelect itemRightDropdownSingleSelect" onClick={_this.select.bind(null, itemRight.name)}><div>{itemRight.name}</div></span>;
            } else {
                rightDiv = <span></span>
            }
            items.push(
                <div key={i+"singleSelectRow"} className="singleSelectListRow">
                        {leftDiv}
                        {rightDiv}
                </div>);
        };
        return items;
    },

    renderListItemsSingleColumn: function() {
        var _this = this;
        var items = [];
        var list = this.props.list;
        console.log("LIST:");
        console.log(list);
        for(var i = 0; i < list.length; i++) {
            var item = list[i];

            var itemDiv = <span key={item.name} className="itemDropdownSingleColumn" onClick={_this.select.bind(null, item.name)}><div>{item.name}</div></span>;
            
            items.push(
                <div key={i+"singleSelectRow"} className="singleSelectListRow">
                        {itemDiv}
                </div>);
        };
        return items;
    },

    render: function() {
        var listItems;
        if(this.props.multipleColumns == true) {
            listItems = this.renderListItemsMultipleColumns();
        } else {
            listItems = this.renderListItemsSingleColumn();
        }
        return (
            <div id="singeSelectDropdown">
                <div id="singleSelectContent">
                    {listItems}
                </div>
                <input type='text' className='form-control' id='singleSelectInput' onClick={this.toggleShowCategories} placeholder='Click to select category' />
            </div>
        );
    }
});

module.exports = EventFormDropdown;