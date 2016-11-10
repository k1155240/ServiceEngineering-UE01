var React = require('react');
var request = require('superagent');
var Link = require('react-router').Link;
var browserHistory = require('react-router').browserHistory;

var TaskCreateTask = React.createClass({
    sendToDb() {
    request
    .post('/api/tasks/')
    .send({title: document.getElementById("title").value,
            description: document.getElementById("description").value,
            state: document.getElementById("state").value,
            from: document.getElementById("from").value,
            to: document.getElementById("to").value,
            project: document.getElementById("project").value,
            milestone: document.getElementById("milestone").value
    })
    .set('Accept', 'application/json')  
    .end(function(err, res) {
        browserHistory.push("/tasks/" + res.body.id);
    });
  },
	render(){
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
                <div className="form-group row">
                    <label htmlFor="Task3">Start date</label>
                    <input type="text" className="form-control" id="from" placeholder="MM-DD-JJJJ"/>
                </div>
                <div className="form-group row">
                    <label htmlFor="Task4">End date</label>
                    <input type="text" className="form-control" id="to" name="Task4" placeholder="MM-DD-JJJ"/>
                </div>
                <div className="form-group row">
                    <label htmlFor="Task5">Choose project</label>
                    <select id="Task5" name="Task5" className="form-control">
                        <option>Projekt1</option>
                        <option>Projekt2</option>
                    </select>
                </div>
                <div className="form-group row">
                    <label htmlFor="Task6">Choose milestone</label>
                    <select id="Task6" name="Task6" className="form-control">
                        <option>Meilenstein1</option>
                        <option>Meilenstein2</option>
                    </select>
                </div>

                <button onClick={this.sendToDb}>Create task</button>
            </div>
		)
	}
});

module.exports = TaskCreateTask;