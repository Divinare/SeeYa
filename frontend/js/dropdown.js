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
    },

    toggleShowCategories: function(e) {
        console.log("ID: ")
        console.log(this.props.categoriesContentId)
        var id = this.props.categoriesContentId
        if($("#" + id).css('display') == 'none') {
            console.log("sliding down")
            $("#" + id).slideDown(150, function(){ });
        } else {
            console.log("sliding up")
            $("#" + id).slideUp(150, function(){ });
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
            <div id={this.props.dropdownId}>
                        <div id={this.props.categoriesContentId}>
                            {this.props.list.map(item =>
                               <div className={"item unSelected"} onClick={this.select.bind(null, item.name)}>{item.name}</div>
                            )}
                        </div>
                    <div id={this.props.selectDivId} onClick={this.toggleShowCategories}>{this.props.selected}</div>
            </div>
        );
    }

});

module.exports = Dropdown;