var React = require('react');
var Link = require('react-router').Link;
var browserHistory = require('react-router').browserHistory;
var ProjectList = require('./ProjectList.jsx');

var Projects = React.createClass({
	ProjectCreate(event) {
		browserHistory.push("/CreateProject");
	},
	ProjectDetail(id) {
		browserHistory.push("/Detail/" + id);
	},
	render(){
		return (
			<div>
				<h1>Projects Overview</h1>
				<p><Link to={'/index.html/'}>Home</Link></p>
				<p><button onClick={this.ProjectCreate}>Create Project</button></p>
				<ProjectList onClick={this.ProjectDetail} /> 
			</div>
		);
	}
});

module.exports = Projects;