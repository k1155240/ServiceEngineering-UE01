var React = require('react');
var Link = require('react-router').Link;
var browserHistory = require('react-router').browserHistory;
var ProblemList = require('./Problems.List.jsx');

var ProblemOverview = React.createClass({
	ProblemCreate(event) {
		browserHistory.push("/problems/create");
	},
	ProblemDetail(id) {
		browserHistory.push("/problems/" + id);
	},
	render(){
		return (
			<div>
				<h1>Problems</h1>
				<p>To create a problem, go the the related task!</p>
				<ProblemList onClick={this.ProblemDetail} /> 
			</div>
		);
	}
});

module.exports = ProblemOverview;