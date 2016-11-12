var React = require('react');

var Login = React.createClass({
	render(){
		return (
			<div>
				<h1>Login</h1>
				<h2><a href="/auth/facebook">Login with Facebook</a></h2>
			</div>
		);
	}
});

module.exports = Login;