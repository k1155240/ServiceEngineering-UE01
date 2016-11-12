var React = require('react');
var request = require('superagent');
var browserHistory = require('react-router').browserHistory;
var Link = require('react-router').Link;

var ProblemSolutionCreate = React.createClass({
  sendToDb() {
    var that = this;
    request
    .post('/api/problems/' + this.props.params.comment_id + '/solutions')
    .send({
          type: "solution",
          text: document.getElementById("description").value
    })
    .set('Accept', 'application/json')  
    .end(function(err, res) {
      browserHistory.push("/problems/" +  that.props.params.comment_id); 
    });
  },
  render() {  
    return (
      <div> 
          <div>
              <h1>Create new solutions</h1>
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

module.exports = ProblemSolutionCreate;