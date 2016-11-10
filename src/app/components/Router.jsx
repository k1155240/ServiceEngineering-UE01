var React = require('react');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;
var Link = require('react-router').Link;
var browserHistory = require('react-router').browserHistory;

var Layout = require('./Layout.jsx');
var Home = require('./Home.jsx');
var Projects = require('./Projects.jsx');
var Milestones = require('./Milestones.jsx');
var Tasks = require('./Tasks.jsx');
var TaskCreateTask = require('./TaskCreateTask.jsx');
var TaskDetail = require('./TaskDetail.jsx');
var TaskEdit = require('./TaskEdit.jsx');
var Detail = require('./Detail.jsx');
var CreateProject = require('./CreateProject.jsx');

var ProblemOverview = require('./ProblemOverview.jsx');
var ProblemCreate = require('./ProblemCreate.jsx');
var ProblemDetail = require('./ProblemDetail.jsx');

var MilestonesCreate = require('./MilestonesCreate.jsx');
var MilestoneDetail = require('./MilestoneDetail.jsx');
var MilestoneEdit = require('./MilestoneEdit.jsx');

var router = React.createClass({
    render(){
		return (
			<Router history={browserHistory}>
                <Route path="/" component={Layout}>
                    <IndexRoute component={Home} />
                    <Route path="/index.html" component={Home}>/></Route>
                    <Route path="projects" component={Projects}></Route>
                    <Route path="milestones" component={Milestones}></Route>
                    <Route path="tasks" component={Tasks}></Route>
                    <Route path="taskcreatetask" component={TaskCreateTask}></Route>
                    <Route path="taskdetail" component={TaskDetail}></Route>
                    <Route path="taskedit" component={TaskEdit}></Route>
					<Route path="detail/:project_id" component={Detail}></Route>
                    <Route path="createProject" component={CreateProject}></Route>
                    
                    <Route path="problemOverview" component={ProblemOverview}></Route>
                    <Route path="problemCreate" component={ProblemCreate}></Route>
                    <Route path="problemDetail/:comment_id" component={ProblemDetail}></Route>

                    <Route path="milestonescreate" component={MilestonesCreate}></Route>
                    <Route path="milestonedetail" component={MilestoneDetail}></Route>
                    <Route path="milestoneedit" component={MilestoneEdit}></Route>
                </Route>
            </Router>
		);
	}
});

module.exports = router;