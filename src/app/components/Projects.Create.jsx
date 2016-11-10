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
        <h1>Problem Creation</h1>
        <p><Link to={'/index.html/'}>Home</Link></p>
        <p><Link to={'/projects'}>Project Overview</Link></p>
        <p>Title: <input type="text" id="title" defaultValue="" /></p>
        <p>Description: <input type="text" id="description" defaultValue="" /></p>
        <p><button onClick={this.sendToDb}>Submit</button></p>
      </div>
    );
  }
});

module.exports = CreateProject; 