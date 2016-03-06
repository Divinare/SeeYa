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

    renderListItems: function() {
        var _this = this;
        var items = [];
        this.props.list.map(function(item) {
            items.push(
                <div className="item unSelected" onClick={_this.select.bind(null, item.name)}>{item.name}
            </div>);
        });
        return items;
    },

    createInputField: function() {
        if(this.props.useBootstrap) {
            return <input type='text' className='form-control' id='category' onClick={this.toggleShowCategories}/>;
        } else {
            return <div id="category" className={this.props.selectDivId} onClick={this.toggleShowCategories}>{this.props.selected}</div>;
        
        }
    },

    render: function() {
        var inputField = this.createInputField();

        return (
            <div id={this.props.dropdownId}>
                <div id={this.props.categoriesContentId}>
                    {this.props.list.map(item =>
                       <div key={item.name} className="item unSelected" onClick={this.select.bind(null, item.name)}>{item.name}</div>
                    )}
                </div>
                {inputField}
            </div>
        );
    }

});

module.exports = Dropdown;