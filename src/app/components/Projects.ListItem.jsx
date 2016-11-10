var React = require('react');

var Project = React.createClass({
	handleClick(){
		this.props.onClick(this.props.id);
	},

	render() {
		return (
			<a className="list-group-item" onClick={this.handleClick}>
				{this.props.title}<br/>
				<span className="glyphicon glyphicon-menu-right"></span>
			</a>
		);

	}
});

module.exports = Project;