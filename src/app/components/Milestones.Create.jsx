var React = require('react');
var request = require('superagent');
var Link = require('react-router').Link;

var MilestonesCreate = React.createClass({
 sendToDb() {
    request
    .post('/api/projects/projects_id')
    .send({user: document.getElementById("from").value,
           task: document.getElementById("to").value,
           type: document.getElementById("description").value,
           })
    .set('Accept', 'application/json')  
    .end(function(err, res) {	      
    });
  },
render(){
		 return (
			<div>
            <div>
				<h1>Neuer Meilenstein</h1>
            </div>
           
            <div className="form-group row">
                <label for="Task1">Meilenstein</label>
                <input type="text" className="form-control"  id="description" placeholder="Meilenstein + Thema"/>
            </div>
            <div className="form-group row">
                <label for="Task3">Meilenstein beginnt am</label>
                <input type="text" className="form-control" id="M4" placeholder="YYYYMMDD"/>
            </div>
            <div className="form-group row">
                <label for="Task3">Meilenstein endet am</label>
                <input type="text" className="form-control" id="M5" placeholder="YYYYMMDD"/>
            </div>
            
            <button type="submit" className="button">Meilenstein anlegen</button>
        </div>
		)
	}
});

module.exports = MilestonesCreate;