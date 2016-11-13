var React = require('react');
var request = require('superagent');
var Link = require('react-router').Link;
var browserHistory = require('react-router').browserHistory;

var TaskEdit = React.createClass({
    getInitialState() {
        return { project: {}};
    },

	componentDidMount() {
		var that = this;

		request.get('/api/projects/' + this.props.params.project_id).end(function(err, res) {
			that.setState({ project: res.body[0]});
		});
	},
    sendToDb() {
        var that = this;

        request
        .post('/api/projects/')
        .send({id: that.state.project._id,
            title: document.getElementById("title").value,
            description: document.getElementById("description").value})
        .set('Accept', 'application/json')  
        .end(function(err, res) {
            browserHistory.push("/projects/" + that.state.project._id);
        });
    },
    handleChangeTitle(event) {
        var project = this.state.project;
        project.title = event.target.value;
        this.setState({ project: project});
    },
    handleChangeDescription(event) {
        var project = this.state.project;
        project.description = event.target.value;
        this.setState({ project: project});
    },
	render(){
		 return (
			<div>
            <div>
				<h1>Edit project</h1>
            </div>
            <div className="form-group row">
                <label htmlFor="title">Title</label>
                <input type="text" className="form-control"  id="title" name="title" placeholder="Title" value={this.state.project.title} onChange={this.handleChangeTitle}/>
            </div>
            <div className="form-group row">
                <label htmlFor="description">Desciption</label>
                <textarea className="form-control" rows="6" id="description" name="description" placeholder="Description"  value={this.state.project.description} onChange={this.handleChangeDescription} />
            </div>
            <button type="submit" className="btn btn-primary" onClick={this.sendToDb}>Submit</button>
        </div>
		)
	}
});

module.exports = TaskEdit;