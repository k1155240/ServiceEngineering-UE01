var React = require('react');
var request = require('superagent');
var Link = require('react-router').Link;
var browserHistory = require('react-router').browserHistory;

var CreateProject = React.createClass({
  sendToDb() {
    request
    .post('/api/projects/')
    .send({title: document.getElementById("title").value,
           description: document.getElementById("description").value})
    .set('Accept', 'application/json')  
    .end(function(err, res) {
        browserHistory.push("/projects/" + res.body.id);
    });
  },
  render() {
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
          <p><button className="btn btn-primary" onClick={this.sendToDb}>Submit</button></p>
        </div>
    );
  }
});

module.exports = CreateProject; 