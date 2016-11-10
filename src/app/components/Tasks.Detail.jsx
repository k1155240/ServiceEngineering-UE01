var React = require('react');
var Link = require('react-router').Link;

var TaskDetail = React.createClass({
	render(){
		 return (
		<div>
            <div>
			<p><Link to={'/taskedit/'}>Bearbeiten</Link></p>
            </div>
             <label className="form-group row">Projekt</label>
            <div className="form-group row">
            <p class="form-control-static">Prozessmanagement</p>
            </div>
            <label className="form-group row">Meilenstein</label>
            <div className="form-group row">
            <p class="form-control-static">Meilenstein1</p>
            </div>
            <label className="form-group row">Aufgabe</label>
            <div className="form-group row">
            <p class="form-control-static">Prozesse definieren</p>
            </div>
            <label className="form-group row">Beschreibung</label>
            <div className="form-group row">
            <p class="form-control-static">Prozesse müssen für Verkauf und Einkauf definiert werden</p>
            </div>
            <label className="form-group row">Beginn</label>
            <div className="form-group row">
            <p class="form-control-static">03.011.2016</p>
            </div>
            <label className="form-group row">Ende</label>
            <div className="form-group row">
            <p class="form-control-static">11.011.2016</p>
            </div>
        </div>
        
		)
	}
});

module.exports = TaskDetail;