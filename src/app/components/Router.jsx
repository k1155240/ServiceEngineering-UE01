var React = require('react');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;
var Link = require('react-router').Link;
var browserHistory = require('react-router').browserHistory;

var Layout = require('./Layout.jsx');
var Home = require('./Home.jsx');
var Projects = require('./Projects.jsx');

var router = React.createClass({
    render(){
		return (
			<Router history={browserHistory}>
                <Route path="/" component={Layout}>
                    <IndexRoute component={Home} />
                    <Route path="/index.html" component={Home}>/></Route>
                    <Route path="projects" component={Projects}></Route>
                </Route>
            </Router>
		);
	}
});

module.exports = router;