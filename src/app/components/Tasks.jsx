var React = require('react');
var TaskList = require('./Tasks.List.jsx');
var TaskCreate = require('./Tasks.CreateTask.jsx');
var Link = require('react-router').Link;
var browserHistory = require('react-router').browserHistory;

var Tasks = React.createClass({
	TaskCreate(event) {
		browserHistory.push("/tasks/create/");
	},
	TaskDetail(id) {
		browserHistory.push("/tasks/" + id);
	},
	render(){
		return (
			<div>
				<h1>Tasks</h1>
				<p><button  className="btn btn-default"  onClick={this.TaskCreate}>Create new task</button></p>
				<TaskList onClick={this.TaskDetail} />
			</div>
		);
	}
});

module.exports = Tasks; 