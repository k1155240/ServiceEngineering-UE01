var React = require('react');
var request = require('superagent');
var browserHistory = require('react-router').browserHistory;
var Link = require('react-router').Link;

var ProblemCreate = React.createClass({
  getInitialState() {
        return { problem: {}};
    },

	componentDidMount() {
		var that = this;

		request.get('/api/problems/' + this.props.params.comment_id).end(function(err, res) {
			that.setState({ problem: res.body[0]});
		});
	},
  handleChangeDescription(event) {
      this.state.problem.text = event.target.value;
      this.setState(this.state);
  },
  handleChangeState(event) {
      this.state.problem.state = event.target.value;
      this.setState(this.state);
  },
  sendToDb() {
    var that = this;
    this.state.problem.id = this.state.problem._id;
    request
    .post('/api/tasks/' + this.state.problem.task + '/problems')
    .send(this.state.problem)
    .set('Accept', 'application/json')  
    .end(function(err, res) {
      browserHistory.push("/problems/" + that.props.params.comment_id);
    });
  },
  render() {
    return (
      <div> 
          <div> 
              <h1>Create new problem</h1>
          </div>
          <div className="form-group row">
              <label htmlFor="description">Description</label>
              <input type="text" className="form-control"  id="description" name="description" placeholder="Description" value={this.state.problem.text} onChange={this.handleChangeDescription}/>
          </div>
          <div className="form-group row">
              <label htmlFor="project">State</label>
              <select id="state" name="state" className="form-control" value={this.state.problem.state} onChange={this.handleChangeState}>
                  <option>Choose a state</option>
                  <option value="open">Open</option>
                  <option value="solved">Solved</option>
              </select>
          </div>
          <p><button className="btn btn-primary" onClick={this.sendToDb}>Submit</button></p>
      </div>
    );
  }
});

module.exports = ProblemCreate;