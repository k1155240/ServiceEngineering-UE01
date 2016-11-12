var React = require('react');
var request = require('superagent');
var Link = require('react-router').Link;
var browserHistory = require('react-router').browserHistory;

var MilestonesCreate = React.createClass({
 sendToDb() {
     var that = this;
    request
    .post('/api/projects/' + this.props.params.project_id + '/milestones/')
    .send({to: document.getElementById("to").value,
        description: document.getElementById("description").value,
    })
    .set('Accept', 'application/json')  
    .end(function(err, res) {
        browserHistory.push("/projects/" + that.props.params.project_id);
    });
  },
render(){
		 return (
			<div> 
                <div>
                    <h1>Create new milestone</h1>
                </div>
                <div className="form-group row">
                    <label htmlFor="description">Description</label>
                    <input type="text" className="form-control"  id="description" name="description" placeholder="Description"/>
                </div>
                <div className="form-group row">
                    <label htmlFor="to">Due date</label>
                    <input type="text" className="form-control" id="to" name="description" placeholder="YYYY-MM-DD"/>
                </div>
                <p><button className="btn btn-primary" onClick={this.sendToDb}>Submit</button></p>
            </div>
		)
	} 
});

module.exports = MilestonesCreate;