var React = require('react');
var Link = require('react-router').Link;


var TaskListItem = React.createClass({
	handleClick(){
		
	},

	render() {
		return (
			<div>
			<p><Link to={'/taskdetail/'}>taskcreatetask</Link></p>
			<a className="list-group-item" onClick={this.handleClick}>
				{this.props.title}
				<span className="glyphicon glyphicon-menu-right"></span>
			</a>
			</div>
		);

	}
});

module.exports = TaskListItem;