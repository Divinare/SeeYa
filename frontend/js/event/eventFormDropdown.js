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

    renderListItemsSingleRow: function() {
        var _this = this;
        var items = [];
        this.props.list.map(function(item) {
            console.log("at mapppppppp");
            items.push(
                <div key={item.name} className="item unSelected" onClick={_this.select.bind(null, item.name)}>{item.name}
            </div>);
        });
        return items;

    },

    renderListItemsMultipleRows: function() {
        var _this = this;
        var items = [];
        var list = this.props.list;
        for(var i = 0; i < list.length; i += 2) {

            var itemLeft = list[i];
            var leftDiv = <span key={itemLeft.name} className={this.props.itemClassName} onClick={_this.select.bind(null, itemLeft.name)}>{itemLeft.name}</span>;
            var rightDiv;
            if(i+1 < list.length) {
                var itemRight = list[i+1];
                rightDiv = <span key={itemRight.name} className={this.props.itemClassName} onClick={_this.select.bind(null, itemRight.name)}>{itemRight.name}</span>;
            }
            console.log("at mapppppppp");
            items.push(
                <div className="listRow">
                        {leftDiv}
                        {rightDiv}
                </div>);
        };
        return <table>{items}</table>;
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


        var listItems;
        if(this.props.singleRow) {
            listItems = this.renderListItemsSingleRow();
        } else {
            listItems = this.renderListItemsMultipleRows();
        }

        return (
            <div id={this.props.dropdownId}>
                <div id={this.props.categoriesContentId}>
                    {listItems}
                </div>
                {inputField}
            </div>
        );
    }
});

module.exports = EventFormDropdown;