var React = require('react');
var request = require('superagent');
var Link = require('react-router').Link;
var browserHistory = require('react-router').browserHistory;

var TaskEdit = React.createClass({
    getInitialState() {
        return { task: {}, users: [], projects: [], milestones: [] };
    },
	componentDidMount() {
		var that = this;

        request.get('/api/tasks/' + this.props.params.task_id).end(function(err, res) {
            that.state.task = res.body[0];
            that.setState(that.state);

            request.get('/api/users/').end(function(err, res) {
                that.state.users = res.body;
                if(!that.state.task.user && that.state.users) {
                    that.state.task.user = that.state.users[0]._id;
                }
                that.setState(that.state);
            });
            request.get('/api/projects/').end(function(err, res) {
                that.state.projects = res.body;
                if(!that.state.task.project && that.state.projects) {
                    that.state.task.project = that.state.projects[0]._id;
                }
                that.setState(that.state);

                if(that.state.task.project) {
                    request.get('/api/projects/' + that.state.task.project + '/milestones').end(function(err, res) {
                        that.state.milestones = res.body;
                        if(!that.state.task.milestone && that.state.milestones) {
                            that.state.task.milestone = that.state.milestones[0]._id;
                        }
                        that.setState(that.state);
                    });
                }
            });
        }); 
	},
    sendToDb() {
        var that = this;
        this.state.task.id = this.state.task._id;
        request
        .post('/api/tasks/')
        .send(this.state.task)
        .set('Accept', 'application/json')  
        .end(function(err, res) {
            browserHistory.push("/tasks/" + that.state.task._id);
        }); 
    },
    handleChangeTitle(event) {
        this.state.task.title = event.target.value;
        this.setState(this.state);
    },
    handleChangeDescription(event) {
        this.state.task.description = event.target.value;
        this.setState(this.state);
    },
    handleChangeState(event) {
        this.state.task.state = event.target.value;
        this.setState(this.state);
    },
    handleChangeFrom(event) {
        this.state.task.from = event.target.value;
        this.setState(this.state);
    },
    handleChangeTo(event) {
        this.state.task.to = event.target.value;
        this.setState(this.state);
    },
    handleChangeProjectId(event) {
        this.state.task.project = event.target.value;
        this.setState(this.state);
        var that = this;
        request.get('/api/projects/' +  this.state.task.project + '/milestones').end(function(err, res) {
			that.state.milestones = res.body;
            that.setState(that.state);
		});
    },
    handleChangeMilestoneId(event) {
        this.state.task.milestone = event.target.value;
        this.setState(this.state);
    },
    handleChangeUserId(event) {
        this.state.task.user = event.target.value;
        this.setState(this.state); 
    },
	render(){
		 return (
			<div>
                <div>
                    <h1>Tasks "{this.state.task.title}"</h1>
                </div>
                <div className="form-group row">
                    <label htmlFor="title">Title</label>
                    <input type="text" className="form-control" id="title" name="title" placeholder="Title" value={this.state.task.title} onChange={this.handleChangeTitle} />
                </div>
                <div className="form-group row">
                    <label htmlFor="description">Description</label>
                    <textarea className="form-control" rows="6" id="description" name="description"  placeholder="Description" value={this.state.task.description} onChange={this.handleChangeDescription} />
                </div>
                <div className="form-group row">
                    <label htmlFor="project">State</label>
                    <select id="state" name="state" className="form-control" value={this.state.state} onChange={this.handleChangeState}>
                        <option>Choose a state</option>
                        <option value="open">Open</option>
                        <option value="closed">Closed</option>
                    </select>
                </div>
                <div className="form-group row">
                    <label htmlFor="from">From</label>
                    <input type="text" className="form-control" id="from" name="from" placeholder="MM-DD-JJJJ" value={this.state.task.from} onChange={this.handleChangeFrom}/>
                </div>
                <div className="form-group row">
                    <label htmlFor="to">To</label>
                    <input type="text" className="form-control" id="to" name="to" placeholder="MM-DD-JJJJ" value={this.state.task.to} onChange={this.handleChangeTo}/> 
                </div>
                <div className="form-group row">
                    <label htmlFor="users">Assigned user</label>
                    <select id="users" name="users" className="form-control" value={this.state.selectedUserId} onChange={this.handleChangeUserId}>
                        {this.state.users.map(u =>
                            <option key={u._id} value={u._id}>{u.lastname}</option>
                        )} 
                    </select>
                </div>
                <div className="form-group row">
                    <label htmlFor="project">Project</label>
                    <select id="project" name="project" className="form-control" value={this.state.task.project} onChange={this.handleChangeProjectId}>
                        {this.state.projects.map(p =>
                            <option key={p._id} value={p._id}>{p.title}</option>
                        )}
                    </select>
                </div>
                <div className="form-group row">
                    <label htmlFor="milestone">Milestone</label>
                    <select id="milestone" name="milestone" className="form-control" value={this.state.task.milestone} onChange={this.handleChangeMilestoneId}>
                        {this.state.milestones.map(m =>
                            <option key={m._id} value={m._id}>{m.description}</option>
                        )} 
                    </select>
                </div>
                <button type="submit" className="btn btn-primary" onClick={this.sendToDb}>Submit</button>
            </div>
		)
	}
});

module.exports = TaskEdit;