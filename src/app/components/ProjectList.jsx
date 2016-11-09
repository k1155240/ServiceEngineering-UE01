var React = require('react');
var request = require('superagent');

var Project = require('./Project.jsx');

var ProjectList = React.createClass({
	click(id) {
		this.props.onClick(id);
	},

	getInitialState() {
		return { projects: [] };
	},

	componentDidMount() {
		var that = this;
		request.get('/api/projects/').end(function(err, res) {
			that.setState({ projects: res.body });
		});
	},
	render(){
		var self = this;

		return (
			<div className="list-group col-xs-12 col-md-6 col-md-offset-3">
				<span className="list-group-item active">Projects</span>
				{this.state.projects.map(t =>
					<Project title={t.title} description={t.description} id={t._id} onClick={self.click}/>
				)}
			</div>
		)

	}

});
 
module.exports = ProjectList;