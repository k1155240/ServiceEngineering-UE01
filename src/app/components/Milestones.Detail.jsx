var React = require('react');
var Link = require('react-router').Link;
var request = require('superagent');
var browserHistory = require('react-router').browserHistory;
var TaskListItem = require('./Tasks.ListItem.jsx');

var MilestoneDetail = React.createClass({
    getInitialState() {
        return { milestone: {}, project: {}, tasks: [] };
    },
      loadTasks() {
		var that = this;
      request.get('/api/milestones/' + this.props.params.milestone_id + '/tasks').end(function(err, res) {
        that.setState({ milestone: that.state.milestone, tasks: res.body  });
      })
  },
	componentDidMount() {
		var that = this;
		request.get('/api/milestones/' + this.props.params.milestone_id).end(function(err, res) {
            that.setState({ milestone: res.body[0], tasks: [] });
            
            
            request.get('/api/projects/' + that.props.params.project_id).end(function(err, res) {
                that.setState({ project: res.body[0] });
            });
            that.loadTasks();
        });
	},
     openTask(id) {
         browserHistory.push("/tasks/" + id);
  },
  TaskCreate() {
       browserHistory.push("/tasks/create/");

  },
	render(){
        return (
            <div>
                <div>
                <h1>Milestone Detail</h1>
                <div><p><Link className="btn btn-default" to={'/projects/' + this.props.params.project_id + '/milestones/' + this.props.params.milestone_id + '/edit'}>Edit</Link></p></div>
                </div>
                <label className="form-group row">Project</label>
                <div className="form-group row">
                <p className="form-control-static"><Link to={'/projects/' + this.props.params.project_id}>{this.state.project.title}</Link></p>
                </div>
                <label className="form-group row">Description</label>
                <div className="form-group row">
                <p className="form-control-static">{this.state.milestone.description}</p> 
                </div>
                <label className="form-group row">Due date</label>
                <div className="form-group row">
                <p className="form-control-static">{this.state.milestone.to}</p>
                </div>
                <div>
				<label className="form-group row">Tasks</label>
        <div className="form-group row">
          <div><p><Link className="btn btn-default" to={'/tasks/create/'}>Create new task</Link></p></div>
          <div className="list-group col-xs-12 col-md-6 col-md-offset-3">
            <span className="list-group-item active">Milestones</span>
            {this.state.tasks.map(m =>
              <TaskListItem id={m._id} title={m.title}  onClick={this.openTask}/> 
            )}
          </div>
        </div>
            </div>
            </div>
		)
	}
});

module.exports = MilestoneDetail;