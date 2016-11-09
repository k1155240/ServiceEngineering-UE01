var React = require('react');

var Project = React.createClass({
	handleClick(){
		this.props.onClick(this.props.id);

	},

	render() {
		return (
			<a className="list-group-item" onClick={this.handleClick}>
				Title: {this.props.title}<br/>
				Description: {this.props.description} <br/>
				ID: {this.props.id}
				<span className="glyphicon glyphicon-menu-right"></span>
			</a>
		);

	}
});

module.exports = Project;