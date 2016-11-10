var React = require('react');
var Link = require('react-router').Link;
var browserHistory = require('react-router').browserHistory;
var ProblemList = require('./ProblemList.jsx');

var ProblemOverview = React.createClass({
	ProblemCreate(event) {
		browserHistory.push("/problemCreate");
	},
	ProblemDetail(id) {
		browserHistory.push("/problemDetail/" + id);
	},
	render(){
		return (
			<div>
				<h1>Problem Overview</h1>
				<p><Link to={'/index.html/'}>Home</Link></p>
				<p><button onClick={this.ProblemCreate}>Create Problem</button></p>
				<ProblemList onClick={this.ProblemDetail} /> 
			</div>
		);
	}
});

module.exports = ProblemOverview;