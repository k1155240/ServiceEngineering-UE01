var React = require('react');
var Link = require('react-router').Link;


var TaskListItem = React.createClass({
	handleClick(){
		this.props.onClick(this.props.id);
	},

	render() {
		return (
			<a className="list-group-item" onClick={this.handleClick}>
				Title: {this.props.title}<br/>
				<span className="glyphicon glyphicon-menu-right"></span>
			</a>
		);
	}
});

module.exports = TaskListItem;