var React = require('react');
var Link = require('react-router').Link;

var ProblemDetail = React.createClass({

  	render() {
		return (
		<div>
			<h1>Problem Detail</h1>
			<p><Link to={'/index.html/'}>Home</Link></p>
			<p><Link to={'/problemOverview'}>Problem Overview</Link></p>
			<p>User ID: <input type="text"/></p>
			<p>Task ID: <input type="text"/></p>
			<p>Type: <input type="text" value="Problem"/></p>
			<p>Text: <input type="text"/></p>
			<p>State: <input type="text" value="Open"/></p>
			<p><button>Edit</button></p>
			<p><button>Close Problem</button></p>
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