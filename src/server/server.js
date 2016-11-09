var express = require("express");
var path = require("path");
var bodyParser = require('body-parser');

var Mongo = require('./mongo.js');

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname,"../app")));

var router = express.Router();

router.route('/projects')

    // create a project (accessed at POST /api/projects)
    .post(function(req, res) {
        var id = req.body.id;
        if (id) {
            Mongo.updateProject(id, req.body.title, req.body.description);
        } else{
            Mongo.insertProject(req.body.title, req.body.description);
        }    
        
        //TODO: ID zurück geben
    }) 

    // get all the projects (accessed at GET /api/projects)
    .get(function(req, res) {
        //res.json(projects);
        Mongo.findAllProjects(function(items) {
           res.json(items);
        });
    });

router.route('/projects/:project_id')

    // get the project with that id (accessed at GET /api/peojects/:project_id)
    .get(function(req, res) {
        // res.json(projects.filter(function(p){ return p.id == req.params.project_id})[0]); 
        Mongo.findProject(req.params.project_id, function(items) {
           res.json(items);
        });
        
    });

router.route('/projects/:project_id/milestones')

    // get the milestones of the project (accessed at GET /api/projects/:project_id/milestones)
    .get(function(req, res) {
        // res.json(milestones.filter(function(m){ return m.projectId == req.params.project_id})); 
        Mongo.findMilestoneByProjectId(req.params.project_id, function(items) {
            res.json(items);
         });

    })

    .post(function(req, res) {
        var id = req.body.id;
        if (id) {
            Mongo.updateMilestone(id, req.body.from, req.body.to, req.body.description, req.params.project_id, req.body.tasks);
        } else{
            Mongo.insertMilestone(req.body.from, req.body.to, req.body.description, req.params.project_id, req.body.tasks);
        }

        //TODO: ID zurück geben
    })
    
    .delete(function(req, res) {
        Mongo.removeMilestone(req.body.id);
    });


router.route('/tasks')

    .delete(function(req, res){
         Mongo.removeTaks(req.body.id);
    })

    // create a task (accessed at POST /api/tasks)
    .post(function(req, res) {
        
        var id = req.body.id;
        if (id) {
            Mongo.updateTask(id, req.body.title, req.body.description, req.body.state, req.body.from, req.body.to, req.body.milestones, req.body.users, req.body.problems, req.body.comments);
            
        } else{
            Mongo.insertTask(req.body.title, req.body.description, req.body.state, req.body.from, req.body.to, req.body.milestones, req.body.users, req.body.problems, req.body.comments);
        }
        
        //TODO: ID zurück geben
    })

    // get all the tasks (accessed at GET /api/tasks)
    .get(function(req, res) {
        // res.json(tasks);
         Mongo.findAllTasks(function(items) {
            res.json(items);
         });
    });

router.route('/tasks/:task_id')

    // get the task with that id (accessed at GET /api/tasks/:task_id)
    .get(function(req, res) {
        // res.json(tasks.filter(function(t){ return t.id == req.params.task_id})[0]); 
        Mongo.findTask(req.params.task_id, function(items) {
           res.json(items);
        });
    });

router.route('/tasks/:task_id/comments')

    // get the task with that id (accessed at GET /api/tasks/:task_id)
    .get(function(req, res) {
        // res.json(comments.filter(function(c){ return c.taskId == req.params.task_id})); 
         Mongo.findCommentsByTaskId(req.params.task_id, function(items) {
           res.json(items);
        });
    });
	
router.route('/comments')

    // get all the comments (accessed at GET /api/comments)
    .get(function(req, res) {
        Mongo.findAllComments(function(items) {
            res.json(items);
        });
    });
	
router.route('/createComment')
	// post comment to db
	.post(function(req, res) {
        
        var id = req.body.id;
        if (id) {
            Mongo.updateComment(id, req.body.user, req.body.task, req.body.type, req.body.text, req.body.state);
            
        } else{
            Mongo.insertComment(req.body.user, req.body.task, req.body.type, req.body.text, req.body.state);
        }
        
        //TODO: ID zurück geben
    })

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