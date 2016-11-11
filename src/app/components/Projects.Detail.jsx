var React = require('react');
var Link = require('react-router').Link;
var request = require('superagent');
var browserHistory = require('react-router').browserHistory;

var Milestone = require('./Milestones.ListItem.jsx');

var Detail = React.createClass({
	getInitialState() {
    return { project: {}, milestones: [] };
  },
  loadMilestones() {
		var that = this;
      request.get('/api/projects/' + this.props.params.project_id + '/milestones').end(function(err, res) {
        that.setState({ project: that.state.project, milestones: res.body  });
      })
  },
  openMilestone(id) {
      browserHistory.push("/projects/" + this.props.params.project_id + '/milestones/' + id);
  },
	componentDidMount() {
		var that = this;

		request.get('/api/projects/' + this.props.params.project_id).end(function(err, res) {
			that.setState({ project: res.body[0], milestones: [] });
      that.loadMilestones();
		});
	},
	render() {
    return (
      <div>
        <h1>Project "{this.state.project.title}"</h1>
        <div><p><Link className="btn btn-default" to={'/projects/edit/' + this.props.params.project_id}>Edit</Link></p></div>
        <label className="form-group row">Title</label>
        <div className="form-group row">
          <p className="form-control-static">{this.state.project.title}</p>
        </div>
        <label className="form-group row">Description</label>
        <div className="form-group row">
          <p className="form-control-static">{this.state.project.description}</p>
        </div>
        <label className="form-group row">Milestones</label>
        <div className="form-group row">
          <div><p><Link className="btn btn-default" to={'/projects/' + this.props.params.project_id + '/milestones/create'}>Create new milestone</Link></p></div>
          <div className="list-group col-xs-12 col-md-6 col-md-offset-3">
            <span className="list-group-item active">Milestones</span>
            {this.state.milestones.map(m =>
              <Milestone description={m.description} from={m.from} to={m.to} id={m._id} onClick={this.openMilestone}/> 
            )}
            </div>
        </div>
      </div>
    );
  }
});

module.exports = Detail;