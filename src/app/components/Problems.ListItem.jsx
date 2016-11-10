var React = require('react');

var Problem = React.createClass({
	handleClick(){
		this.props.onClick(this.props.name);

	},

	render() {
		return (
			<a className="list-group-item" onClick={this.handleClick}>
				User: {this.props.user}<br/>
				Task: {this.props.task}<br/>
				Type: {this.props.type}<br/>
				Text: {this.props.text}<br/>
				State: {this.props.state}
				<span className="glyphicon glyphicon-menu-right"></span>
			</a>
		);

	}
});

module.exports = Problem;