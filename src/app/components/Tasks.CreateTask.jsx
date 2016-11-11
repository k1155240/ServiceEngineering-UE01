var React = require('react');
var request = require('superagent');
var Link = require('react-router').Link;
var browserHistory = require('react-router').browserHistory;

var TaskCreateTask = React.createClass({
    getInitialState() {
        return { users: [], projects: [], milestones: [], selectedMilestoneId:'', selectedProjectId: ''};
    },
	componentDidMount() {
		var that = this;

		request.get('/api/users/').end(function(err, res) {
			that.setState({  projects: that.state.projects, users: res.body, milestones: that.state.milestones, selectedMilestoneId: that.state.selectedMilestoneId, selectedProjectId: that.state.selectedProjectId});
		});
        request.get('/api/projects/').end(function(err, res) {
			that.setState({ projects: res.body, users: that.state.users, milestones: that.state.milestones, selectedMilestoneId: that.state.selectedMilestoneId, selectedProjectId: that.state.selectedProjectId});
		});
	},
    sendToDb() {
        request
        .post('/api/tasks/')
        .send({title: document.getElementById("title").value,
                description: document.getElementById("description").value,
                state: document.getElementById("state").value,
                from: document.getElementById("from").value,
                to: document.getElementById("to").value,
                project: document.getElementById("project").value,
                milestone: document.getElementById("milestone").value
        })
        .set('Accept', 'application/json')  
        .end(function(err, res) {
            browserHistory.push("/tasks/" + res.body.id);
        }); 
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
                    <label htmlFor="Task1">Title</label>
                    <input type="text" className="form-control"  id="title" placeholder="Title"/>
                </div>
                <div className="form-group row">
                    <label htmlFor="Task2">Description</label>
                    <textarea className="form-control" rows="6" id="description" placeholder="Description"/>
                </div>
                <div className="form-group row">
                    <label htmlFor="Task3">Start date</label>
                    <input type="text" className="form-control" id="from" placeholder="MM-DD-JJJJ"/>
                </div>
                <div className="form-group row">
                    <label htmlFor="Task4">End date</label>
                    <input type="text" className="form-control" id="to" name="Task4" placeholder="MM-DD-JJJ"/>
                </div>
                <div className="form-group row">
                    <label htmlFor="users">Assign a user</label>
                    <select id="users" name="users" className="form-control" value={this.state.selectedUserId} onChange={this.handleChangeUserId}>
                        <option>Choose user</option>
                        {this.state.users.map(u =>
                            <option value={u._id}>{u.lastname}</option>
                        )}
                    </select>
                </div>
                <div className="form-group row">
                    <label htmlFor="Task5">Choose project</label>
                    <select id="Task5" name="Task5" className="form-control" value={this.state.selectedProjectId} onChange={this.handleChangeProjectId}>
                        <option>Choose project</option>
                        {this.state.projects.map(p =>
                            <option value={p._id}>{p.title}</option>
                        )}
                    </select>
                </div>
                <div className="form-group row">
                    <label htmlFor="Task6">Choose milestone</label>
                    <select id="Task6" name="Task6" className="form-control" value={this.state.selectedMilestoneId} onChange={this.handleChangeMilestoneId}>
                        <option>Choose milestone</option>
                        {this.state.milestones.map(m =>
                            <option value={m._id}>{m.description}</option>
                        )}
                    </select>
                </div>

                <button className="btn btn-primary"  onClick={this.sendToDb}>Create task</button>
            </div>
		)
	}
});

module.exports = TaskCreateTask;