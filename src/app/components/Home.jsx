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
				<p><Link to={'/projects/'}>Projects</Link></p>
				<p><Link to={'/tasks/'}>Tasks</Link></p>
				<p><Link to={'/problems/'}>Problems</Link></p>			
				<Search onSearch={this.searchForAddress} />
			</div>
		);
	}
});

module.exports = Home;