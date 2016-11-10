var React = require('react');
var request = require('superagent');

var Problem = require('./Problems.ListItem.jsx');

var ProblemList = React.createClass({
	getInitialState() {
		return { problems: [] };
	},

	componentDidMount() {
		var that = this;
		request.get('/api/comments/').end(function(err, res) {
			that.setState({ problems: res.body });
		});
	},
	render(){
		var self = this;

		return (
			<div className="list-group col-xs-12 col-md-6 col-md-offset-3">
				<span className="list-group-item active">Problem</span>
				{this.state.problems.map(t =>
					<Problem user={t.user} task={t.task} type={t.type} text={t.text} state={t.state} onClick={self.props.onClick}/>
				)}
			</div>
		)

	}

});
 
module.exports = ProblemList;