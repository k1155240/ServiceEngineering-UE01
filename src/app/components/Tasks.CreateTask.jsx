var React = require('react');
var request = require('superagent');
var Link = require('react-router').Link;
var browserHistory = require('react-router').browserHistory;

var TaskCreateTask = React.createClass({
    getInitialState() {
        return { users: [], projects: [], milestones: [], selectedMilestoneId:'', selectedProjectId: '', selectedUserId: ''};
    },
	componentDidMount() {
		var that = this;

		request.get('/api/users/').end(function(err, res) {
            that.state.users = res.body;
            that.setState(that.state);
        });
        request.get('/api/projects/').end(function(err, res) {
            that.state.projects = res.body;
            that.setState(that.state);
        });
	},
    sendToDb() {
        if(this.state.selectedUserId != "" && this.state.selectedProjectId != "" && this.state.selectedMilestoneId != "") {
        request
        .post('/api/tasks/')
        .send({title: document.getElementById("title").value,
                description: document.getElementById("description").value,
                state: 'open',
                from: document.getElementById("from").value,
                to: document.getElementById("to").value,
                user: this.state.selectedUserId,
                project: this.state.selectedProjectId,
                milestone: this.state.selectedMilestoneId
        })
        .set('Accept', 'application/json')  
        .end(function(err, res) {
            browserHistory.push("/tasks/" + res.body.id);
        }); 
        } else {
        alert("User, project and milestone must not be empty.");
        }
    },
    handleChangeProjectId(event) {
        this.state.selectedProjectId = event.target.value;
        this.setState(this.state);
        var that = this;
        request.get('/api/projects/' +  this.state.selectedProjectId + '/milestones').end(function(err, res) {
			that.state.milestones = res.body;
            that.setState(that.state);
		});
    },
    handleChangeMilestoneId(event) {
        this.state.selectedMilestoneId = event.target.value;
        this.setState(this.state);
    },
    handleChangeUserId(event) {
        this.state.selectedUserId = event.target.value;
        this.setState(this.state);
    },
	render(){
		 return ( 
			<div>
                <div>
                    <h1>Create new task</h1>
                </div>
                <div className="form-group row">
                    <label htmlFor="title">Title</label>
                    <input type="text" className="form-control" id="title" name="title" placeholder="Title"/>
                </div>
                <div className="form-group row">
                    <label htmlFor="description">Description</label>
                    <textarea className="form-control" rows="6" id="description" name="description" placeholder="Description"/>
                </div>
                <div className="form-group row">
                    <label htmlFor="from">From</label>
                    <input type="text" className="form-control" id="from" name="from" placeholder="MM-DD-JJJJ"/>
                </div>
                <div className="form-group row">
                    <label htmlFor="to">To</label>
                    <input type="text" className="form-control" id="to" name="to" placeholder="MM-DD-JJJJ"/>
                </div>
                <div className="form-group row">
                    <label htmlFor="users">Assigned user</label>
                    <select id="users" name="users" className="form-control"  value={this.state.selectedUserId} onChange={this.handleChangeUserId}>
                        <option>Choose a user</option>
                        {this.state.users.map(u =>
                            <option key={u._id} value={u._id}>{u.lastname}</option>
                        )} 
                    </select>
                </div>
                <div className="form-group row">
                    <label htmlFor="project">Project</label>
                    <select id="project" name="project" className="form-control" value={this.state.selectedProjectId} onChange={this.handleChangeProjectId}>
                        <option>Choose a project</option>
                        {this.state.projects.map(p =>
                            <option key={p._id} value={p._id}>{p.title}</option>
                        )}
                    </select>
                </div>
                <div className="form-group row">
                    <label htmlFor="milestone">Milestone</label>
                    <select id="milestone" name="milestone" className="form-control" value={this.state.selectedMilestoneId} onChange={this.handleChangeMilestoneId}>
                        <option>Choose a milestone</option>
                        {this.state.milestones.map(m =>
                            <option key={m._id} value={m._id}>{m.description}</option>
                        )} 
                    </select>
                </div>

                <button className="btn btn-primary" onClick={this.sendToDb}>Submit</button>
            </div>
		)
	}
});

module.exports = TaskCreateTask;