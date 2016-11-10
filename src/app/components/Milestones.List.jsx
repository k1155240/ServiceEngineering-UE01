var React = require('react');
var request = require('superagent');

var Milestone = require('./Milestones.ListItem.jsx');

var MilestoneList = React.createClass({
	getInitialState() {
		return { milestones: [] };
	},

	componentDidMount() {
		var that = this;
		request.get('/api/milestones/').end(function(err, res) {
			that.setState({ milestones: res.body });
		});
	},
   
	render(){

		var self = this;

		return (
			<div className="list-group col-xs-12 col-md-6 col-md-offset-3">
				<span className="list-group-item active">Milestones</span>
				{this.state.milestones.map(t =>
					<Milestone description={t.description} from={t.from} to={t.to} onClick={self.props.onClick}/>
				)}
			</div>
		)

	}

});
 
module.exports = MilestoneList;