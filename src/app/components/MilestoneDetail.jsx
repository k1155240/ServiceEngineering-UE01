var React = require('react');
var Link = require('react-router').Link;

var MilestoneDetail = React.createClass({
	render(){
		 return (
		<div>
            <div>
            <h1>Milestone Detail</h1>
			<p><Link to={'/milestoneedit/'}>Bearbeiten</Link></p>
            </div>
             <label className="form-group row">Projekt</label>
            <div className="form-group row">
            <p class="form-control-static">Prozessmanagement</p>
            </div>
            <label className="form-group row">Meilenstein</label>
            <div className="form-group row">
            <p class="form-control-static" type="text" value="Milestone"/>
            </div>
           
            <label className="form-group row">Beschreibung</label>
            <div className="form-group row">
            <p class="form-control-static">Beschreibung Meilenstein</p>
            </div>
            <label className="form-group row">Beginn</label>
            <div className="form-group row">
            <p class="form-control-static">03.011.2016</p>
            </div>
            <label className="form-group row">Ende</label>
            <div className="form-group row">
            <p class="form-control-static">11.011.2016</p>
            </div>
            <p> Aufgaben, die in diesem Meilestein erledigt werden müssen:</p>
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
        </div>
        
		)
	}
});

module.exports = MilestoneDetail;