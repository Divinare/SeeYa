var Dropdown = React.createClass({
    getInitialState: function() {
        return {
            listVisible: false
        };
    },

    select: function(item) {
        this.props.selectCategory(item);
    },

    toggleShowCategories: function(e) {
        var categoriesContent = $("#categories-content")[0];
        if($("#categories-content").css('display') == 'none') {
            $("#categories-content").slideDown(150, function(){ });
        } else {
            $("#categories-content").slideUp(150, function(){ });
        }
    },

    renderListItems: function() {
        var _this = this;
        var items = [];
        this.props.list.map(function(item) {
            items.push(
                <div className="item unSelected" onClick={_this.select.bind(null, item)}>{item}
            </div>);
        });
        return items;
    },

    render: function() {
        return (
            <div className="dropdown">
                        <div className="dropdown-content" id="categories-content">
                            {this.renderListItems()}
                        </div>
                    <div className="dropdown-btn" onClick={this.toggleShowCategories}>{this.props.selected}</div>
            </div>
        );
    }

});

module.exports = Dropdown;