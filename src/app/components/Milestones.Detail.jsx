var React = require('react');
var Link = require('react-router').Link;
var request = require('superagent');
var browserHistory = require('react-router').browserHistory;

var MilestoneDetail = React.createClass({
    getInitialState() {
        return { milestone: {}, project: {} };
    },
	componentDidMount() {
		var that = this;

		request.get('/api/milestones/' + this.props.params.milestone_id).end(function(err, res) {
            that.state.milestone = res.body[0];
            that.setState(that.state);
            
            request.get('/api/projects/' + that.props.params.project_id).end(function(err, res) {
                that.state.project = res.body[0];
                that.setState(that.state);
            });
        });
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
            </div>
		)
	}
});

module.exports = MilestoneDetail;