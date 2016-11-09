var React = require('react');

var Milestone = React.createClass({
	handleClick(){
		this.props.onClick(this.props.title);

	},

	render() {
		return (
			<a className="list-group-item" onClick={this.handleClick}>
				Description: {this.props.description}<br/>
				From: {this.props.from}<br/>
				To: {this.props.to}
				<span className="glyphicon glyphicon-menu-right"></span>
			</a>
		);

	}
});

module.exports = Milestone;