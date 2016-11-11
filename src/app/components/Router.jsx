var React = require('react');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;
var Link = require('react-router').Link;
var browserHistory = require('react-router').browserHistory;

var Layout = require('./Layout.jsx');

var Home = require('./Home.jsx');
var Login = require('./Login.jsx');
var LoginSuccess = require('./Login.success.jsx');

var Projects = require('./Projects.jsx');
var CreateProject = require('./Projects.Create.jsx');
var EditProject = require('./Projects.Edit.jsx');
var Detail = require('./Projects.Detail.jsx');

var Tasks = require('./Tasks.jsx');
var TaskCreateTask = require('./Tasks.CreateTask.jsx');
var TaskDetail = require('./Tasks.Detail.jsx');
var TaskEdit = require('./Tasks.Edit.jsx');

var ProblemOverview = require('./Problems.Overview.jsx');
var ProblemCreate = require('./Problems.Create.jsx');
var ProblemDetail = require('./Problems.Detail.jsx');

var MilestonesCreate = require('./Milestones.Create.jsx');
var MilestoneDetail = require('./Milestones.Detail.jsx');
var MilestoneEdit = require('./Milestones.Edit.jsx');

function requireAuth(nextState, replace) {
        if (sessionStorage.loggedIn != "true") {
            replace({
                pathname: '/login/' 
            })
        }
    };

var router = React.createClass({
    

    render(){
		return (
			<Router history={browserHistory}>
                <Route path="/" component={Layout}>
                    <IndexRoute component={Home} onEnter={requireAuth} />
                    <Route path="/index.html" component={Home} onEnter={requireAuth}></Route>

                    <Route path="/login" component={Login}></Route>
                    <Route path="/login/success" component={LoginSuccess}></Route>

                    <Route path="projects" component={Projects} onEnter={requireAuth}></Route>
                    <Route path="projects/create/" component={CreateProject} onEnter={requireAuth}></Route>
                    <Route path="projects/edit/:project_id" component={EditProject} onEnter={requireAuth}></Route>
                    <Route path="projects/:project_id" component={Detail} onEnter={requireAuth}></Route>

                    <Route path="projects/:project_id/milestones/create" component={MilestonesCreate} onEnter={requireAuth}></Route>
                    <Route path="projects/:project_id/milestones/:milestone_id" component={MilestoneDetail} onEnter={requireAuth}></Route>
                    <Route path="projects/:project_id/milestones/:milestone_id/edit" component={MilestoneEdit} onEnter={requireAuth}></Route>

                    <Route path="tasks" component={Tasks} onEnter={requireAuth}></Route>
                    <Route path="tasks/create" component={TaskCreateTask} onEnter={requireAuth}></Route>
                    <Route path="tasks/:task_id" component={TaskDetail} onEnter={requireAuth}></Route>
                    <Route path="tasks/:task_id/edit" component={TaskEdit} onEnter={requireAuth}></Route>				

                    <Route path="tasks/:task_id/problems" component={ProblemOverview} onEnter={requireAuth}></Route>
                    <Route path="tasks/:task_id/problems/create" component={ProblemCreate} onEnter={requireAuth}></Route>
                    <Route path="tasks/:task_id/problems/:comment_id" component={ProblemDetail} onEnter={requireAuth}></Route>
                </Route>
            </Router>
		);
	}
});

module.exports = router;