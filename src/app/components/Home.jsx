var React = require('react');
var Search = require('./Search.jsx');
var TaskList = require('./TaskList.jsx');
var Link = require('react-router').Link;

var Home = React.createClass({
	searchForAddress(term){
		alert(term); 
	},
	
	render(){
		return (
			<div>
				<h1>Your Tasks</h1>
				<Link to={'/projects/'}>projects</Link>		
				<Search onSearch={this.searchForAddress} />
				<TaskList onClick={this.searchForAddress} /> 
			</div>
		);
	}
});

module.exports = Home;