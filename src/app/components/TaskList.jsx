var React = require('react');
var TaskListItem = require('./TaskListItem.jsx');

var TaskList = React.createClass({

	render(){

		var self = this;

		var tasks = [ {title: "Task1"}, {title: "Task2"}, {title: "Task3"} ].map(function(t){
			return <TaskListItem title={t.title} onClick={self.props.onClick} />
		});

		return (
			<div className="list-group col-xs-12 col-md-6 col-md-offset-3">
				<span className="list-group-item active">Tasks</span>
				{tasks}
			</div>
		)

	}

});

module.exports = TaskList;