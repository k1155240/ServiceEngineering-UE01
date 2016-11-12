var React = require('react');

var Solution = React.createClass({
	render() {
		return (
			<a className="list-group-item">
				{this.props.text}<br/>
			</a>
		);

	}
});

module.exports = Solution;