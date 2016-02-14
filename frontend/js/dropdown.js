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
        console.log(this.props.selected);
        //console.log(this.renderListItems());
        return (
            <div className="dropdown">
                        <div className="dropdown-content" id="categories-content">
                            {this.props.list.map(item =>
                               <div className="item unSelected" onClick={this.select.bind(null, item.name)}>{item.name}</div>
                            )}
                        </div>
                    <div className="dropdown-btn" onClick={this.toggleShowCategories}>{this.props.selected}</div>
            </div>
        );
    }

});

module.exports = Dropdown;