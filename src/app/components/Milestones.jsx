var React = require('react');
var Link = require('react-router').Link;
var MilestoneList = require('./Milestones.List.jsx');
var browserHistory = require('react-router').browserHistory;

var Milestones = React.createClass({
		searchForAddress(term){
		alert(term); 
	},
	onClick(event) {
		browserHistory.push("/milestonedetail/");
	},
	ButtonClicked(event) {
		browserHistory.push("/milestonescreate");
	},
	render(){
		return (
			<div>
				<h1>Milestones</h1>
				<p><Link to={'/milestonescreate'}>+ neuen Meilenstein hinzufügen</Link></p>
				<p><Link to={'/milestonedetail/'}>Detail Meilenstein</Link></p>
				<MilestoneList onClick={this.milestonedtail} /> 
			</div>
		);
	}
});

module.exports = Milestones;