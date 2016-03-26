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
        var id = this.props.categoriesContentId
        if($("#" + id).css('display') == 'none') {
            $("#" + id).slideDown(150, function(){ });
        } else {
            $("#" + id).slideUp(150, function(){ });
        }
    },



    render: function() {
        return (

            <div id={this.props.dropdownId}>
                <div id={this.props.categoriesContentId}>
                {this.props.list.map(item =>
                    <div key={item.name} className="item unSelected" onClick={this.select.bind(null, item.name)}>{item.name}</div>
                )}
                </div>
                <div id="category" className="dropdownBtnEventList" onClick={this.toggleShowCategories}>{this.props.selected}</div>
            </div>
            
        );
    }
});

module.exports = Dropdown;