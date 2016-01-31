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
        var items = [];
        for (var i = 0; i < this.props.list.length; i++) {
            var item = this.props.list[i];
            items.push(
                <div className="item unSelected" onClick={this.select.bind(null, item)}>{item.name}
            </div>);
        }
        return items;
    },

    render: function() {
        console.log("at renderrrrrrrrrr");
        return (
            <div className="dropdown">
                        <div className="dropdown-content" id="categories-content">
                            {this.renderListItems()}
                        </div>
                    <div className="dropdown-btn" onClick={this.toggleShowCategories}>{this.props.selected.name}</div>
            </div>
        );
    }

});

module.exports = Dropdown;