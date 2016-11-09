var React = require('react');
var Link = require('react-router').Link;
var TaskList = require('./TaskList.jsx');
var browserHistory = require('react-router').browserHistory;

var Tasks = React.createClass({
	render(){
		return (
			<div>
				<h1>Tasks</h1>
				<p><Link to={'/taskcreatetask'}>+ neue Aufgabe hinzufügen</Link></p>
				<p><Link to={'/taskdetail/'}>Detail Aufgabe</Link></p>
				<TaskList onClick={this.taskdetail} />
			</div>
		);
	}
});

module.exports = Tasks;