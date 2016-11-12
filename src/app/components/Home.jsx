var React = require('react');
var Search = require('./Search.jsx');
var Link = require('react-router').Link;

var Home = React.createClass({
	searchForAddress(term){
		alert(term); 
	},
	
	
	render(){
		return (
			<div>
				<h1>Dashboard</h1>
				<p><Link className="btn btn-primary btn-lg btn-block" to={'/projects/'}>Projects</Link></p>
				<p><Link className="btn btn-primary btn-lg btn-block" to={'/tasks/'}>Tasks</Link></p>
				<p><Link className="btn btn-primary btn-lg btn-block" to={'/problems/'}>Problems</Link></p>
			</div>
		);
	}
});

module.exports = Home;