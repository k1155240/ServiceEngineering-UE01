var React = require('react');
var request = require('superagent');
var Link = require('react-router').Link;

var MilestonesCreate = React.createClass({
 sendToDb() {
    request
    .post('/api/projects/projects_id')
    .send({from: document.getElementById("from").value,
           to: document.getElementById("to").value,
           description: document.getElementById("description").value,
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
                <label for="M1">Meilenstein</label>
                <input type="text" className="form-control"  id="description" placeholder="Meilenstein + Thema"/>
            </div>
            <div className="form-group row">
                <label for="M3">Meilenstein beginnt am</label>
                <input type="text" className="form-control" id="from" placeholder="YYYY-MM-DD"/>
            </div>
            <div className="form-group row">
                <label for="M3">Meilenstein endet am</label>
                <input type="text" className="form-control" id="to" placeholder="YYYY-MM-DD"/>
            </div>
            
            <p><button onClick={this.sendToDb}>Meilenstein anlegen</button></p>
        </div>
		)
	}
});

module.exports = MilestonesCreate;