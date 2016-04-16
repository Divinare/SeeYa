var React = require('react');


var maxToolbarIconsCount = 6;

const Toolbar = React.createClass({

    getInitialState: function() {

        return {
            toolbarComponentData: {}
        };

    },

    componentDidMount: function() {
    },

    componentWillMount: function() {
    },

    updateToolbarIcons: function(toolbarComponentData) {
        this.setState({
            toolbarComponentData: toolbarComponentData
        })
    },

    createToolbarIcons: function() {
        var toolbarComponentData = this.state.toolbarComponentData;
        var toolbarIcons = [];
        for(var toolbarComponent in toolbarComponentData) {
            console.log(toolbarComponent);
            console.log(toolbarComponentData[toolbarComponent]);
            var iconName = toolbarComponent + "Icon";
            var iconFunc = toolbarComponentData[toolbarComponent];
            var iconContainer = <div key={toolbarComponent} className="toolbarIcon" id={iconName} onClick={iconFunc}></div>;
            toolbarIcons.push(iconContainer);
        }

        for(var i = toolbarIcons.length; i < maxToolbarIconsCount; i++) {
            var iconKey = "empty" + i;
            var emptyContainer = <div key={iconKey} className="toolbarIcon"></div>;
            toolbarIcons.push(emptyContainer);
        }

        return toolbarIcons;
    },

    render: function(){
        var toolbarIcons = this.createToolbarIcons();
        return (
            <div id="toolbarContainer">
                {toolbarIcons}
            </div>
        )
    }

});

module.exports = Toolbar;