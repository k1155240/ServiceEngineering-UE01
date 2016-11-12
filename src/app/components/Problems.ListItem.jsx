var React = require('react');

var Problem = React.createClass({
	handleClick(){
		this.props.onClick(this.props.id);

	},

	render() {
		return (
			<a className="list-group-item" onClick={this.handleClick}>
				{this.props.text}<br/>
				{this.props.state}
				<span className="glyphicon glyphicon-menu-right"></span>
			</a>
		);

	}
});

module.exports = Problem;