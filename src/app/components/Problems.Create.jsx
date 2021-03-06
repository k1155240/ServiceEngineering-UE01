var React = require('react');
var request = require('superagent');
var browserHistory = require('react-router').browserHistory;
var Link = require('react-router').Link;

var ProblemCreate = React.createClass({
  sendToDb() {
    var that = this;
    request
    .post('/api/tasks/' + this.props.params.task_id + '/problems')
    .send({
          type: "problem",
          text: document.getElementById("description").value,
          state: "open"
    })
    .set('Accept', 'application/json')  
    .end(function(err, res) {
      browserHistory.push("/tasks/" + that.props.params.task_id); 
    });
  },
  render() {
    return (
      <div> 
          <div>
              <h1>Create new problem</h1>
          </div>
          <div className="form-group row">
              <label htmlFor="description">Description</label>
              <input type="text" className="form-control"  id="description" name="description" placeholder="Description"/>
          </div>
          <p><button className="btn btn-primary" onClick={this.sendToDb}>Submit</button></p>
      </div>
    );
  }
});

module.exports = ProblemCreate;