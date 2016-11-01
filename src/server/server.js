var express = require("express");
var path = require("path");
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname,"../app")));

var users = [{ id:'1', firstname:'Firstname1', lastname:'Lastname1', email:'test@test.at'}, { id:'2', firstname:'Firstname2', lastname:'Lastname2', email:'test2@test.at'}];
var projects = [{ id:'1', title:'TestProject1', description:'testdescription1'}, { id:'2', title:'TestProject2', description:'testdescription2' }];
var tasks = [{ id:'1', title:'TestTask1', description:'testdescription1', state:'active', from:'', to:'', milestoneId:'1', userId:'1' }, { id:'2', title:'TestTask2', description:'testdescription2', state:'closed', from:'', to:'', milestoneId:'1', userId:'1'}];
var comments = [{ id:'1', name:'TestComment1', type:'comment', text:'comment1', userId:'1', taskId:'1' }, { id:'2', name:'TestComment2', type:'comment', text:'comment1', userId:'1', taskId:'1' }];

var router = express.Router();

router.route('/projects')

    // create a project (accessed at POST /api/projects)
    .post(function(req, res) {
        var newProject = {
            id: (Math.max.apply(null, projects.map(function(p) {return Number(p.id)})) + 1).toString(),
            title: req.body.title,
            description: req.body.description
        }
        projects.push(newProject);

        res.json({id: newProject.id}); 
    }) 

    // get all the projects (accessed at GET /api/projects)
    .get(function(req, res) {
        res.json(projects);
    });

router.route('/projects/:project_id')

    // get the project with that id (accessed at GET /api/peojects/:project_id)
    .get(function(req, res) {
        res.json(projects.filter(function(p){ return p.id == req.params.project_id})[0]); 
    });

router.route('/projects/:project_id/milestones')

    // get the milestones of the project (accessed at GET /api/projects/:project_id/milestones)
    .get(function(req, res) {
        res.json(milestones.filter(function(m){ return m.projectId == req.params.project_id})); 
    });

router.route('/tasks')

    // create a task (accessed at POST /api/tasks)
    .post(function(req, res) {
        
    })

    // get all the tasks (accessed at GET /api/tasks)
    .get(function(req, res) {
        res.json(tasks);
    });

router.route('/tasks/:task_id')

    // get the task with that id (accessed at GET /api/tasks/:task_id)
    .get(function(req, res) {
        res.json(tasks.filter(function(t){ return t.id == req.params.task_id})[0]); 
    });

router.route('/tasks/:task_id/comments')

    // get the task with that id (accessed at GET /api/tasks/:task_id)
    .get(function(req, res) {
        res.json(comments.filter(function(c){ return c.taskId == req.params.task_id})); 
    });

router.route('/issues')

    // get all the issues (accessed at GET /api/issues)
    .get(function(req, res) {
        res.json(comments.filter(function(c){ return c.type == 'issue'}));
    });

app.use('/api', router);

app.get("/projects",function(req,res,next){
  res.sendFile(path.resolve(__dirname + '/../app//index.html'));
})

app.listen(7777,function(){
    console.log("Started listening on port", 7777);
});