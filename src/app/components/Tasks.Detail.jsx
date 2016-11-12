var React = require('react');
var request = require('superagent');
var Link = require('react-router').Link;
var browserHistory = require('react-router').browserHistory;

var Problem = require('./Problems.ListItem.jsx');

var TaskDetail = React.createClass({
    getInitialState() {
        return { task: {}, project: {}, milestone: {}, user: {}, problems: []  };
    },
    openProblem(event) {
		browserHistory.push("/problems/" + event);
	},
	componentDidMount() {
		var that = this;

		request.get('/api/tasks/' + this.props.params.task_id).end(function(err, res) {
            that.state.task = res.body[0];
            that.setState(that.state);
            
            if(that.state.task.project) {
                request.get('/api/projects/' + that.state.task.project).end(function(err, res) {
                    that.state.project = res.body[0];
                    that.setState(that.state);
                });

                if(that.state.task.milestone) {
                    request.get('/api/milestones/' + that.state.task.milestone).end(function(err, res) {
                        that.state.milestone = res.body[0];
                        that.setState(that.state); 
                    });
                }
            } 
            if(that.state.task.user) {
                request.get('/api/users/' + that.state.task.user).end(function(err, res) {
                    that.state.user = res.body[0];
                    that.setState(that.state); 
                });
            }

            request.get('/api/tasks/' + that.props.params.task_id + '/problems').end(function(err, res) {
                that.state.problems = res.body;
                that.setState(that.state); 
            });
        })  
	},
	render(){
		 return (
            <div>
                <h1>Task "{this.state.task.title}"</h1>
                <div><p><Link className="btn btn-default" to={'/tasks/' + this.props.params.task_id + '/edit'}>Edit</Link></p></div>
                <div className="form-group row">
                    <label>Title</label>
                    <p className="form-control-static">{this.state.task.title}</p>
                </div>
                <div className="form-group row">
                    <label>Description</label>
                    <p className="form-control-static">{this.state.task.description}</p>
                </div>
                <div className="form-group row">
                    <label>State</label>
                    <p className="form-control-static">{this.state.task.state}</p>
                </div>
                <div className="form-group row">
                    <label>From</label>
                    <p className="form-control-static">{this.state.task.from}</p>
                </div>
                <div className="form-group row">
                    <label>To</label>
                    <p className="form-control-static">{this.state.task.to}</p>
                </div>
                <div className="form-group row">
                    <label>Assigned user</label>
                    <p className="form-control-static">{this.state.user.lastname}</p>
                </div>
                <div className="form-group row">
                    <label>Project</label>
                    <p className="form-control-static">
                        <Link to={'/projects/' + this.state.task.project}>{this.state.project.title}</Link>
                    </p>
                </div>
                <div className="form-group row">
                    <label>Milestone</label>
                    <p className="form-control-static">
                        <Link to={'/projects/' + this.state.task.project + '/milestones/' + this.state.task.milestone}>{this.state.milestone.description}</Link>
                    </p>
                </div>
                <div className="form-group row">
                    <label>Problems</label>
                    <div><p><Link className="btn btn-default" to={'/tasks/' + this.props.params.task_id + '/problems/create'}>Create new problem</Link></p></div>
                    <div className="list-group col-xs-12 col-md-6 col-md-offset-3">
                        <span className="list-group-item active">Problems</span>
                        {this.state.problems.map(t =>
                            <Problem key={t._id} id={t._id} user={t.user} task={t.task} type={t.type} text={t.text} state={t.state} onClick={this.openProblem}/>
                        )}
                    </div>
                </div>
            </div>
		)
	}
});

module.exports = TaskDetail;