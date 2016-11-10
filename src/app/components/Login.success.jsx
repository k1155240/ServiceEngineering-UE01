var React = require('react');
var browserHistory = require('react-router').browserHistory;

var Login = React.createClass({
	componentDidMount() {
		sessionStorage.loggedIn=true;
		browserHistory.push("/"); 
	},
	render(){
		 return ( 
			<div>
			</div>
	)
}
}); 

module.exports = Login;