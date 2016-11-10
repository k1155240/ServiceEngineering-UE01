var React = require('react');
var request = require('superagent');
var Link = require('react-router').Link;

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
    });
  },  
    


	render(){
		 return (
			<div>
            <div>
				<h1>Neue Aufgabe</h1>
            </div>
            <div className="form-group row">
                <label for="Task1">Thema der Aufgabe</label>
                <input type="text" className="form-control"  id="title" placeholder="Thema"/>
            </div>
            <div className="form-group row">
                <label for="Task2">Beschreibung der Aufgabe</label>
                <textarea className="form-control" rows="6" id="description" placeholder="Beschreibung"/>
            </div>
            <div className="form-group row">
                <label for="Task3">Aufgabe beginnt am</label>
                <input type="text" className="form-control" id="from" placeholder="YYYY-MM-DD"/>
            </div>
            <div className="form-group row">
                <label for="Task3">Aufgabe endet am</label>
                <input type="text" className="form-control" id="to" placeholder="YYYY-MM-DD"/>
            </div>
            <strong>Projekt auswählen</strong>
            <select className="form-control">
                <option>Projekt1</option>
                <option>Projekt2</option>
           </select>
            <strong>Meilenstein auswählen</strong>
            <select className="form-control">
                <option>Meilenstein1</option>
                <option>Meilenstein2</option>
            </select>
            <button type="submit" className="button">Aufgabe anlegen</button>
        </div>
		)
	}
});

module.exports = TaskCreateTask;