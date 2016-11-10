var React = require('react');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;
var Link = require('react-router').Link;
var browserHistory = require('react-router').browserHistory;

var Layout = require('./Layout.jsx');
var Home = require('./Home.jsx');

var Projects = require('./Projects.jsx');
var CreateProject = require('./Projects.Create.jsx');
var EditProject = require('./Projects.Edit.jsx');
var Detail = require('./Projects.Detail.jsx');

var Milestones = require('./Milestones.jsx');
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

var router = React.createClass({
    render(){
		return (
			<Router history={browserHistory}>
                <Route path="/" component={Layout}>
                    <IndexRoute component={Home} />
                    <Route path="/index.html" component={Home}>/></Route>

                    <Route path="projects" component={Projects}></Route>
                    <Route path="projects/create/" component={CreateProject}></Route>
                    <Route path="projects/edit/:project_id" component={EditProject}></Route>
                    <Route path="projects/:project_id" component={Detail}></Route>

                    <Route path="projects/:project_id/milestones" component={Milestones}></Route>
                    <Route path="projects/:project_id/milestones/create" component={MilestonesCreate}></Route>
                    <Route path="projects/:project_id/milestones/:milestone_id" component={MilestoneDetail}></Route>
                    <Route path="projects/:project_id/milestones/:milestone_id/edit" component={MilestoneEdit}></Route>

                    <Route path="tasks" component={Tasks}></Route>
                    <Route path="tasks/create" component={TaskCreateTask}></Route>
                    <Route path="tasks/:task_id" component={TaskDetail}></Route>
                    <Route path="tasks/:task_id/edit" component={TaskEdit}></Route>
					

                    <Route path="tasks/:task_id/problems" component={ProblemOverview}></Route>
                    <Route path="tasks/:task_id/problems/create" component={ProblemCreate}></Route>
                    <Route path="tasks/:task_id/problems/:comment_id" component={ProblemDetail}></Route>
                </Route>
            </Router>
		);
	}
});

module.exports = router;