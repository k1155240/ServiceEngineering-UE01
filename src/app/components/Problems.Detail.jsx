var React = require('react');
var Link = require('react-router').Link;
var request = require('superagent');
var updateRequest = require('superagent');

var ProblemDetail = React.createClass({
	getInitialState() {
		return { comments: [] };
	},

	componentDidMount() {
		var that = this;

		request.get('/api/comments/' + this.props.params.comment_id).end(function(err, res) {
			that.setState({ comments: res.body[0] });
		});
	},

	handleSubmit(event) {
		alert(this.state.comments.state);
  	},

	closeProblem() {
		if (this.state.comments.type == "Problem" && this.state.comments.state == "Open") {
			updateRequest
			.post('/api/createComment/')
			.send({id: this.props.params.comment_id, 
				   user: document.getElementById("user").value,
				   task: document.getElementById("task").value,
				   type: document.getElementById("type").value,
			       text: document.getElementById("text").value,
				   state: document.getElementById("state").value})
			.set('Accept', 'application/json')  
			.end(function(err, res) {      
			});
			alert("Problem was successfully updated!")
		} else {
			alert("Problem was already closed!")
		}
	},

  	render() {
		return (
		<div>
			<h1>Problem Detail</h1>
			<p><Link to={'/index.html/'}>Home</Link></p>
			<p><Link to={'/problemOverview'}>Problem Overview</Link></p>
			<p>User ID: <input type="text" value={this.state.comments.user} /></p>
			<p>Task ID: <input type="text" value={this.state.comments.task} /></p>
			<p>Type: <input type="text" value={this.state.comments.type} /></p>
			<p>Text: <input type="text" value={this.state.comments.text} /></p>
			<p>State: <input type="text" value={this.state.comments.state} /></p>
			<p><button onClick={this.handleSubmit}>Edit</button></p>
			<p><button onClick={this.closeProblem}>Close Problem</button></p>
			<h2>Add Comment/Solution</h2>
			<p>User ID: <input type="text"/></p>
			<p>Task ID: <input type="text"/></p>
			<p>Text: <input type="text"/></p>
			<p><button>Add Comment</button><button>Add Solution</button></p>
		</div>
		);
  	}
});

module.exports = ProblemDetail;