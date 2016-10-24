var React = require('react');

var TaskListItem = React.createClass({
	handleClick(){
		this.props.onClick(this.props.title);
	},

	render() {
		return (
			<a className="list-group-item" onClick={this.handleClick}>
				{this.props.title}
				<span className="glyphicon glyphicon-menu-right"></span>
			</a>
		);

	}
});

module.exports = TaskListItem;