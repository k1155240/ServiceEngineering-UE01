var React = require('react');
var request = require('superagent');

var TaskListItem = require('./TaskListItem.jsx');

var TaskList = React.createClass({
	getInitialState() {
		return { tasks: [] };
	},

	componentDidMount() {
		var that = this;
		request.get('/api/tasks').end(function(err, res) {
			that.setState({ tasks: res.body });
		});
	},

	render(){

		var self = this;

		var tasks = [ {title: "Task1"}, {title: "Task2"}, {title: "Task3"} ].map(function(t){
			return <TaskListItem title={t.title} onClick={self.props.onClick} />
		});

		return (
			<div className="list-group col-xs-12 col-md-6 col-md-offset-3">
				<span className="list-group-item active">Tasks</span>
				{this.state.tasks.map(t =>
					<TaskListItem title={t.title} onClick={self.props.onClick} />
				)}
			</div>
		)

	}

});
 
module.exports = TaskList;