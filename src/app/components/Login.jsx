var React = require('react');

var Login = React.createClass({
	render(){
		return (
			<div>
				<h1>Login</h1>
				<p><a href="/auth/facebook">Login with Facebook</a></p>
			</div>
		);
	}
});

module.exports = Home;