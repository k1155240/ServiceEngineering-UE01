var express = require("express");
var path = require("path");
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')
var session = require('express-session')

var Mongo = require('./mongo.js');

var passport = require('passport')
  , FacebookStrategy = require('passport-facebook').Strategy;

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({ secret: 'SECRET' }));
app.use(passport.initialize());
app.use(passport.session());


app.use(express.static(path.join(__dirname,"../app")));

passport.use(new FacebookStrategy({
        clientID: '559105414283188',
        clientSecret: '2bfd1e271df4c63f8788d588ef17b43f',
        callbackURL: "http://localhost:7777/auth/facebook/callback"
    },
    function(accessToken, refreshToken, profile, done) {
        console.log('profile ' + profile.id);
        done(null, profile.id);
    }
));

passport.serializeUser(function(user, done) {
  done(null, user); 
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

app.get('/auth/facebook', passport.authenticate('facebook'));

app.get('/auth/facebook/callback',
    passport.authenticate('facebook', { 
        successRedirect: '/login/success',
        failureRedirect: '/login' 
}));

var router = express.Router();
router.use(ensureAuthenticatedAPI);

router.route('/projects')

    // create a project (accessed at POST /api/projects)
    .post(function(req, res) {
        var id = req.body.id;
        if (id) {
            Mongo.updateProject(id, req.body.title, req.body.description);
        } else{
            Mongo.insertProject(req.body.title, req.body.description, function(id){
                console.log(id);
                res.json({id: id});
            });
        }    
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
            Mongo.updateMilestone(id, req.body.from, req.body.to, req.body.description, req.params.project_id);
        } else{
            Mongo.insertMilestone(req.body.from, req.body.to, req.body.description, req.params.project_id, function(id){
                res.json({id: id});
            });
        }           
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
            Mongo.updateTask(id, req.body.title, req.body.description, req.body.state, req.body.from, req.body.to, req.body.milestone, req.body.user, null, null);
            
        } else{
            Mongo.insertTask(req.body.title, req.body.description, req.body.state, req.body.from, req.body.to, req.body.milestone, req.body.user, null, null, function(id){
                res.json({id: id});
            });
        } 
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
    .post(function(req, res) {
        
        var id = req.body.id;
        if (id) {
            Mongo.updateComment(id, req.body.text, req.body.userId, req.body.taskId, req.body.problems, req.body.solution);
            
        } else{
            Mongo.insertComment(req.body.text, req.body.userId, req.body.taskId, req.body.problems, req.body.solution, function(id){
                res.json({id: id});
            });
            
        }
        
    })
    .get(function(req, res) {
        // res.json(comments.filter(function(c){ return c.taskId == req.params.task_id})); 
         Mongo.findCommentsByTaskId(req.params.task_id, function(items) {
           res.json(items);
        });
    });

// ---------------------------------------------------------------------------------------
// ALL COMMENTS
router.route('/comments')
    // get all comments (accessed at GET /api/comments)
    .get(function(req, res) {
         Mongo.findAllComments(function(items) {
           res.json(items);
        });
    });

// COMMENT WITH ID
router.route('/comments/:comment_id')
    // get the comment with that id (accessed at GET /api/comments/:comment_id)
    .get(function(req, res) {
         Mongo.findComment(req.params.comment_id, function(items) {
           res.json(items);
        });
    });

// CREATE COMMENT    	
router.route('/createComment')
	// post comment to db
	.post(function(req, res) {
        var id = req.body.id;
        if (id) {
            Mongo.updateComment(id, req.body.user, req.body.task, req.body.type, req.body.text, req.body.state); 
        } else {
            Mongo.insertComment(req.body.user, req.body.task, req.body.type, req.body.text, req.body.state);
        }
    })

// UPDATE COMMENT    	
router.route('/updateComment/')
	// post comment to db
	.post(function(req, res) {
        console.log(Mongo.updateComment(req.body.id, req.body.user, req.body.task, req.body.type, req.body.text, req.body.state));
    }); 


app.use('/api', router);

app.get("/projects/*", ensureAuthenticated, function(req,res,next){
  res.sendFile(path.resolve(__dirname + '/../app//index.html'));
});
app.get("/tasks/*", ensureAuthenticated, function(req,res,next){
  res.sendFile(path.resolve(__dirname + '/../app//index.html'));
});
app.get("/login/*",function(req,res,next){
  res.sendFile(path.resolve(__dirname + '/../app//index.html'));
}); 

app.listen(7777,function(){
    console.log("Started listening on port", 7777);
});

function ensureAuthenticatedAPI(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
    res.json({authenticated: false});
}

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
    res.redirect('/login/')
}