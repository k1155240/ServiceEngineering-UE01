var React = require('react');

var Milestone = React.createClass({
	handleClick(){
		this.props.onClick(this.props.id);
	},

	render() {
		return (
			<a className="list-group-item" onClick={this.handleClick}>
				Description: {this.props.description}<br/>
				To: {this.props.to}
				<span className="glyphicon glyphicon-menu-right"></span>
			</a>
		);

	}
});

module.exports = Milestone;