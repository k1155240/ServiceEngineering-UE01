var React = require('react');
var Link = require('react-router').Link;
var request = require('superagent');

var Detail = React.createClass({
	searchForAddress(term){
		alert(term); 
	},
	onClick(term) {
		window.location.replace('/index.html');

	},
        getInitialState: function() {
        return { projects: {} };
    },

	

        componentDidMount() {
		var that = this;

		request.get('/api/projects/' + this.props.params.project_id).end(function(err, res) {
			that.setState({ projects: res.body[0] });
      alert(that.state.projects.title);
		});
	},


     

  handleSubmit(event) {
    alert(this.state.projects.title);
    alert(this.state.projects); 
	
  },

	  render() {
    return (
      <div>
	  	<h1>Details!</h1>
		<p><Link to={'/index.html/'}>Home</Link></p>
		<p><Link to={'/projects'}>Projects</Link></p>
            <div>
			<p><Link to={'/ProjectEdit/'}>Bearbeiten</Link></p> 
            </div>
             <label className="form-group row">Projekt</label>
            <div className="form-group row">
            <p class="form-control-static">{this.state.projects.title}</p>
            </div>
            <label className="form-group row">Meilensteine</label>
            <div className="form-group row">
            <p class="form-control-static">Meilenstein1</p>
            </div>
            <label className="form-group row">Beschreibung</label>
            <div className="form-group row">
            <p class="form-control-static">{this.state.projects.description}</p>
            </div>
            <p><button onClick={this.handleSubmit}>
          Submit
        </button></p>
        </div>
    );
  }
});

module.exports = Detail;