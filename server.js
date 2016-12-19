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
app.use(session({ secret: 'thatsfunny' }));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new FacebookStrategy({
        clientID: '559105414283188',
        clientSecret: '2bfd1e271df4c63f8788d588ef17b43f',
        callbackURL: "http://sepm.azurewebsites.net/auth/facebook/callback"
    },
    function(accessToken, refreshToken, profile, done) {
        console.log('profile ' + profile.id);
        Mongo.findUserByFb(profile.id, function(users){
            if(users.length > 0) {
                done(null, users[0]);
            }
            else {
                Mongo.insertUser('', profile.displayName, '', profile.id, function(id, user) {
                    done(null, user);
                });
            }
        });
    }
));

passport.serializeUser(function(user, done) {
    console.log(user);
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

router.route('/clear')

    // get all the users (accessed at GET /api/users)
    .get(function(req, res) {
        Mongo.clear();
    });

router.route('/users')

    // get all the users (accessed at GET /api/users)
    .get(function(req, res) {
        Mongo.findAllUsers(function(users) {
           res.json(users);
        });
    });

router.route('/users/:user_id')

    // get all the users (accessed at GET /api/users)
    .get(function(req, res) {
        Mongo.findUser(req.params.user_id, function(users) {
           res.json(users);
        }); 
    });

router.route('/projects')

    // create a project (accessed at POST /api/projects)
    .post(function(req, res) {
        var id = req.body.id;
        if (id) {
            Mongo.updateProject(id, req.body.title, req.body.description, function(){
                res.json({success: true});
            });
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
            Mongo.updateMilestone(id, req.body.to, req.body.description, req.params.project_id, function(){
                res.json({success: true});
            });
        } else{
            Mongo.insertMilestone(req.body.to, req.body.description, req.params.project_id, function(id){
                res.json({id: id});
            });
        }           
    })
    
    .delete(function(req, res) {
        Mongo.removeMilestone(req.body.id);
    });


router.route('/milestones/:milestone_id/tasks')

    // get the tasks of the milestone of the project (accessed at GET /api/milestones/:milestone_id/tasks)
    .get(function(req, res) {
        // res.json(milestones.filter(function(m){ return m.projectId == req.params.project_id})); 
        Mongo.findTaskByMilestoneID(req.params.milestone_id, function(items) {
            res.json(items);
         });
    });

router.route('/milestones/:milestone_id')

    // get the milestones of the project (accessed at GET /api/projects/:project_id/milestones)
    .get(function(req, res) {
        // res.json(milestones.filter(function(m){ return m.projectId == req.params.project_id})); 
        Mongo.findMilestone(req.params.milestone_id, function(items) {
            res.json(items);
         });
    });

router.route('/tasks')

    .delete(function(req, res){
         Mongo.removeTaks(req.body.id);
    })

    // create a task (accessed at POST /api/tasks)
    .post(function(req, res) {
        
        var id = req.body.id;
        if (id) {
            Mongo.updateTask(id, req.body.title, req.body.description, req.body.state, req.body.from, req.body.to, req.body.project, req.body.milestone, req.body.user, function() {
                res.json({success: true});
            });
            
        } else{
            Mongo.insertTask(req.body.title, req.body.description, req.body.state, req.body.from, req.body.to, req.body.project, req.body.milestone, req.body.user, function(id){
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

router.route('/tasks/:task_id/problems')

    // get the task with that id (accessed at GET /api/tasks/:task_id)
    .post(function(req, res) {
        
        var id = req.body.id;
        if (id) {
            Mongo.updateComment(id, req.user._id, req.params.task_id, "problem", req.body.text, req.body.state, null, function(id){
                res.json({success: true});
            }); 
        } else{
            Mongo.insertComment(req.user._id, req.params.task_id, "problem", req.body.text, "open", null, function(id){
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
router.route('/problems')
    // get all comments (accessed at GET /api/comments)
    .get(function(req, res) {
         Mongo.findAllProblems(function(items) {
           res.json(items);
        });
    });

router.route('/problems/:problem_id/solutions')
    // get all comments (accessed at GET /api/comments)
    .get(function(req, res) {
         Mongo.findAllSolutionsForProblem(req.params.problem_id, function(items) {
           res.json(items);
        });
    })
    .post(function(req, res) {
         Mongo.insertComment(req.user._id, req.body.task, "solution", req.body.text, null, req.params.problem_id, function(id){
            res.json({id: id});
        });
    });

// PROBLEM WITH ID
router.route('/problems/:comment_id')
    // get the comment with that id (accessed at GET /api/comments/:comment_id)
    .get(function(req, res) {
         Mongo.findComment(req.params.comment_id, function(items) {
           res.json(items);
        });
    });

app.use('/api', router);

app.get("/projects/*", ensureAuthenticated, function(req,res,next){
  res.sendFile(path.resolve(__dirname + '/../app//index.html'));
}); 
app.get("/tasks/*", ensureAuthenticated, function(req,res,next){
  res.sendFile(path.resolve(__dirname + '/../app//index.html'));
});
app.get("/problems/*", ensureAuthenticated, function(req,res,next){
  res.sendFile(path.resolve(__dirname + '/../app//index.html'));
});
app.get("/login/*",function(req,res,next){
  res.sendFile(path.resolve(__dirname + '/../app//index.html'));
}); 
app.get("/",ensureAuthenticated,function(req,res,next){
  //res.sendFile(path.resolve(__dirname + '/../app//index.html'));
  res.send("Hello world " + __dirname);
}); 
app.get("/index.html",ensureAuthenticated,function(req,res,next){
    console.log(req.user);
  //res.sendFile(path.resolve(__dirname + '/../app//index.html'));
  res.send("Hello world " + __dirname);
}); 

app.use(express.static(path.join(__dirname,"../app")));

app.listen(process.env.port,function(){
    console.log("Started listening on port ", process.env.port);
});

function ensureAuthenticatedAPI(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
   //return next();
    res.json({authenticated: false});
}

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  //return next();
    res.redirect('/login/')
}
