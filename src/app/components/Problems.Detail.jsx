var React = require('react');
var Link = require('react-router').Link;
var request = require('superagent');
var updateRequest = require('superagent');
var Solution = require('./Problems.Solutions.ListItem.jsx');

var ProblemDetail = React.createClass({
	getInitialState() {
		return { problem: {}, task:{}, user:{}, solutions:[] };
	},

	componentDidMount() {
		var that = this;

		request.get('/api/problems/' + this.props.params.comment_id).end(function(err, res) {
			that.setState({ problem: res.body[0] });

			request.get('/api/problems/' + that.props.params.comment_id + '/solutions').end(function(err, res) {
				that.setState({ solutions: res.body });
			});

			request.get('/api/tasks/' + that.state.problem.task).end(function(err, res) {
				that.setState({ task: res.body[0] });
			});
			
			if(that.state.problem.user) {
				request.get('/api/users/' + that.state.problem.user).end(function(err, res) {
					that.setState({ user: res.body[0] });
				});
			}
		});
	},

	handleSubmit(event) {
		alert(this.state.problem.state);
  	},

	closeProblem() {
		if (this.state.problem.type == "Problem" && this.state.problem.state == "Open") {
			updateRequest
			.post('/api/createComment/')
			.send({id: this.props.params.comment_id, 
				   user: document.getElementById("user").value,
				   task: document.getElementById("task").value,
				   type: document.getElementById("type").value,
			       text: document.getElementById("text").value,
				   state: document.getElementById("state").value})
			.set('Accept', 'application/json')  
			.end(function(err, res) {      
			});
			alert("Problem was successfully updated!")
		} else {
			alert("Problem was already closed!")
		}
	},

  	render() {
		return (
			<div>
                <div>
                <h1>Problem Detail</h1>
                <div><p><Link className="btn btn-default" to={'/problems/' + this.props.params.comment_id + '/edit'}>Edit</Link></p></div>
                </div>
                <label className="form-group row">Task</label>
                <div className="form-group row">
                <p className="form-control-static"><Link to={'/tasks/' + this.state.problem.task}>{this.state.task.title}</Link></p>
                </div>
				<label className="form-group row">User</label>
                <div className="form-group row">
                <p className="form-control-static">{this.state.user.lastname}</p>
                </div> 
                <label className="form-group row">Description</label>
                <div className="form-group row">
                <p className="form-control-static">{this.state.problem.text}</p>
                </div>
				<label className="form-group row">State</label>
                <div className="form-group row">
                <p className="form-control-static">{this.state.problem.state}</p>
                </div>
				<div className="form-group row">
					<div><p><Link className="btn btn-default" to={'/problems/' + this.props.params.comment_id + '/solutions/create'}>Create new solution</Link></p></div>
					<div className="list-group col-xs-12 col-md-6 col-md-offset-3">
						<span className="list-group-item active">Solutions</span>
						{this.state.solutions.map(t =>
							<Solution key={t._id} id={t._id} user={t.user} text={t.text}/>
						)}
					</div>
				</div>
            </div> 
		);
  	}
});

module.exports = ProblemDetail;