var React = require('react');


var TaskCreateTask = React.createClass({
	render(){
		 return (
			<div>
            <div>
				<h1>Neue Aufgabe</h1>
            </div>
            <div className="form-group row">
                <label for="Task1">Thema der Aufgabe</label>
                <input type="text" className="form-control"  id="Task1" placeholder="Thema"/>
            </div>
            <div className="form-group row">
                <label for="Task2">Beschreibung der Aufgabe</label>
                <textarea className="form-control" rows="6" id="Task2" placeholder="Beschreibung"/>
            </div>
            <div className="form-group row">
                <label for="Task3">Aufgabe beginnt am</label>
                <input type="text" className="form-control" id="Task3" placeholder="DDMMJJJJ"/>
            </div>
            <div className="form-group row">
                <label for="Task3">Aufgabe endet am</label>
                <input type="text" className="form-control" id="Task4" placeholder="DDMMJJJ"/>
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