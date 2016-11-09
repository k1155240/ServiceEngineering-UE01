var React = require('react');
var TaskList = require('./TaskList.jsx');

var Tasks = React.createClass({
	render(){
		return (
			<div>
				<h1>Tasks</h1>
				<TaskList onClick={this.searchForAddress} />
			</div>
		);
	}
});

module.exports = Tasks;