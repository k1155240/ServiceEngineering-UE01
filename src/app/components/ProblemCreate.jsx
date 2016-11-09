var React = require('react');
var request = require('superagent');
var Link = require('react-router').Link;

var ProblemCreate = React.createClass({
  sendToDb() {
    request
    .post('/api/createComment/')
    .send({user: document.getElementById("user").value,
           task: document.getElementById("task").value,
           type: document.getElementById("type").value,
           text: document.getElementById("text").value,
           state: document.getElementById("state").value})
    .set('Accept', 'application/json')  
    .end(function(err, res) {	      
    });
  },
  render() {
    return (
      <div>
        <h1>Problem Creation</h1>
        <p><Link to={'/index.html/'}>Home</Link></p>
        <p><Link to={'/problemOverview'}>Problem Overview</Link></p>
        <p>User ID: <input type="text" id="user" defaultValue="" /></p>
        <p>Task ID: <input type="text" id="task" defaultValue="" /></p>
        <p>Type: <input type="text" id="type" value="Problem"/></p>
        <p>Text: <input type="text" id="text" defaultValue="" /></p>
        <p>State: <input type="text" id="state" value="Open"/></p>
        <p><button onClick={this.sendToDb}>Submit</button></p>
      </div>
    );
  }
});

module.exports = ProblemCreate;