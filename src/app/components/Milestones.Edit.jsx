var React = require('react');


var MilestoneEdit = React.createClass({
	render(){
		 return (
			<div>
            <div>
				<h1>Überschrift des Projektes</h1>
            </div>
            <div className="form-group row">
                <label for="Task1">Meilenstein</label>
                <input type="text" className="form-control"  id="M1" placeholder="Meilenstein1"/>
            </div>
            <div className="form-group row">
                <label for="Task2">Beschreibung des Meilensteins</label>
                <textarea className="form-control" rows="6" id="M2" placeholder="Beschreibung"/>
            </div>
            <div className="form-group row">
                <label for="Task3">Meilenstein beginnt am</label>
                <input type="text" className="form-control" id="M3" placeholder="DDMMJJJJ"/>
            </div>
            <div className="form-group row">
                <label for="Task3">Meilenstein endet am</label>
                <input type="text" className="form-control" id="M4" placeholder="DDMMJJJ"/>
            </div>
            <table className="table table-hover">
				<tbody>
					<tr>
						<th>Aufgaben</th>
						<th>Beginn</th>
						<th>Ende</th>
					</tr>
					<tr>
						<td>ihfoir</td>
						<td>lkfhgldk</td>
						<td>lkxhvl</td>
					</tr>
					</tbody>
				</table>
            <button type="submit" className="button">Meilenstein ändern</button>
        </div>
		)
	}
});

module.exports = MilestoneEdit;