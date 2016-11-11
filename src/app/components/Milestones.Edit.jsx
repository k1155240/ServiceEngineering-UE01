var React = require('react');
var request = require('superagent');
var Link = require('react-router').Link;
var browserHistory = require('react-router').browserHistory;

var MilestoneEdit = React.createClass({
    getInitialState() {
    return { milestone: {}};
  },

	componentDidMount() {
		var that = this;

		request.get('/api/milestones/' + this.props.params.milestone_id).end(function(err, res) {
			that.setState({ milestone: res.body[0]});
		});
	},
 sendToDb() {
     var that = this;
    request
    .post('/api/projects/' + this.props.params.project_id + '/milestones/')
    .send({id: that.state.milestone._id,
        to: document.getElementById("to").value,
        description: document.getElementById("description").value,
    })
    .set('Accept', 'application/json')  
    .end(function(err, res) {
        browserHistory.push("/projects/" + that.props.params.project_id);
    });
  },
  handleChangeTo(event) {
        var milestone = this.state.milestone;
        milestone.to = event.target.value;
        this.setState({ milestone: milestone});
    },
    handleChangeDescription(event) {
        var milestone = this.state.milestone;
        milestone.description = event.target.value;
        this.setState({ milestone: milestone});
    },
render(){
		 return (
			<div> 
            <div>
				<h1>Edit milestone</h1>
            </div>
           
            <div className="form-group row">
                <label htmlFor="description">Description</label>
                <input type="text" className="form-control"  id="description" name="description" placeholder="Description" value={this.state.milestone.description} onChange={this.handleChangeDescription}/>
            </div>
            <div className="form-group row">
                <label htmlFor="to">Due date</label>
                <input type="text" className="form-control" id="to" name="description" placeholder="YYYY-MM-DD" value={this.state.milestone.to} onChange={this.handleChangeTo}/>
            </div>
            
            <p><button className="btn btn-primary" onClick={this.sendToDb}>Submit</button></p>
        </div>
		)
	} 
});

module.exports = MilestoneEdit;