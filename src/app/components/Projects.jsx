var React = require('react');
var Link = require('react-router').Link;
var browserHistory = require('react-router').browserHistory;
var ProjectList = require('./Projects.List.jsx');

var Projects = React.createClass({
	ProjectCreate(event) {
		browserHistory.push("/projects/create/");
	},
	ProjectDetail(id) {
		browserHistory.push("/projects/" + id);
	},
	render(){
		return (
			<div>
				<h1>Projects</h1>
				<p><Link to={'/index.html/'}>Home</Link></p>
				<p><button onClick={this.ProjectCreate}>Create Project</button></p>
				<ProjectList onClick={this.ProjectDetail} /> 
			</div>
		);
	}
});

module.exports = Projects;