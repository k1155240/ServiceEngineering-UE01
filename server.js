var express = require("express");
var path = require("path");
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')
var session = require('express-session')

//var Mongo = require('./build/server/mongo.js');
var sqlDB = require('./build/server/SqlStatements.js');

var passport = require('passport')
  , FacebookStrategy = require('passport-facebook').Strategy
  , FacebookTokenStrategy = require('passport-facebook-token');

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({ secret: 'thatsfunny' }));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new FacebookStrategy({
        clientID: '1613716625604484',
        clientSecret: '7a7b2c6d52d9d250370865ccd9f5f114',
        callbackURL: "http://sepm.azurewebsites.net/auth/facebook/callback"
    },
    function(accessToken, refreshToken, profile, done) {
        console.log('profile ' + profile.id);
        sqlDB.findUserByFbId(profile.id, function(users){
            if(users.length > 0) {
                done(null, users[0]);
            }
            else {
                sqlDB.insertUser(profile.id, '', profile.displayName, '', function(id, user) {
                    done(null, user);
                });
            }
        });
    }
));

passport.use(new FacebookTokenStrategy({
    clientID: '1229894717047932',
    clientSecret: 'e842a1821c019e3024c611d232d3ca6c'
  }, function(accessToken, refreshToken, profile, done) {
        sqlDB.findUserByFbId(profile.id, function(users){
            if(users.length > 0) {
                done(null, users[0]);
            }
            else {
                sqlDB.insertUser(profile.id, '', profile.displayName, '' , function(id, user) {
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

app.get('/auth/facebook/token',
  passport.authenticate('facebook-token'),
  function (req, res) {
    // do something with req.user
    res.send("test");
  }
);

var router = express.Router();
router.use(ensureAuthenticatedAPI);
router.use(nocache);

router.route('/clear')

    // get all the users (accessed at GET /api/users)
    .get(function(req, res) {
        sqlDB.clear();
    });

router.route('/users')

    // get all the users (accessed at GET /api/users)
    .get(function(req, res) {
        sqlDB.findAllUsers(function(users) {
           res.json(users);
        });
    });

router.route('/users/:user_id')

    // get all the users (accessed at GET /api/users)
    .get(function(req, res) {
        sqlDB.findUser(req.params.user_id, function(users) {
           res.json(users);
        }); 
    });

router.route('/projects')

    // create a project (accessed at POST /api/projects)
    .post(function(req, res) {
        var id = req.body.id;
        if (id) {
            sqlDB.updateProject(id, req.body.title, req.body.description, function(){
                res.json({success: true});
            });
        } else{
            sqlDB.insertProject(req.body.title, req.body.description, function(id){
                console.log(id);
                res.json({success: true, id: id});
            });
        }    
    }) 
    // get all the projects (accessed at GET /api/projects)
    .get(function(req, res) {
        sqlDB.findAllProjects(function(items) {
           res.json(items);
        });
    });

router.route('/projects/:project_id')

    // get the project with that id (accessed at GET /api/peojects/:project_id)
    .get(function(req, res) {
        // res.json(projects.filter(function(p){ return p.id == req.params.project_id})[0]); 
        sqlDB.findProject(req.params.project_id, function(items) {
           res.json(items);
        });
    })
    .put(function(req, res) {
        sqlDB.updateProject(req.params.project_id, req.body.title, req.body.description, function(){
            res.json({success: true});
        });
    });

router.route('/projects/:project_id/milestones')

    // get the milestones of the project (accessed at GET /api/projects/:project_id/milestones)
    .get(function(req, res) {
        // res.json(milestones.filter(function(m){ return m.projectId == req.params.project_id})); 
        sqlDB.findMilestoneByProjectId(req.params.project_id, function(items) {
            res.json(items);
         });
    })

    .post(function(req, res) {
        var id = req.body.id;
        if (id) {
            sqlDB.updateMilestone(id, req.body.to, req.body.description, req.params.project_id, function(){
                res.json({success: true});
            });
        } else{
            sqlDB.insertMilestone(req.body.to, req.body.description, req.params.project_id, function(id){
                res.json({success: true, id: id});
            });
        }           
    })
    
    .delete(function(req, res) {
        sqlDB.removeMilestone(req.body.id);
    });


router.route('/milestones/:milestone_id/tasks')

    // get the tasks of the milestone of the project (accessed at GET /api/milestones/:milestone_id/tasks)
    .get(function(req, res) {
        // res.json(milestones.filter(function(m){ return m.projectId == req.params.project_id})); 
        sqlDB.findTaskByMilestoneID(req.params.milestone_id, function(items) {
            res.json(items);
         });
    });

router.route('/milestones/:milestone_id')

    // get the milestones of the project (accessed at GET /api/projects/:project_id/milestones)
    .get(function(req, res) {
        // res.json(milestones.filter(function(m){ return m.projectId == req.params.project_id})); 
        sqlDB.findMilestone(req.params.milestone_id, function(items) {
            res.json(items);
         });
    }).put(function(req, res) {
        sqlDB.updateMilestone(req.params.milestone_id, req.body.to, req.body.description, req.body.project_id, function(){
            res.json({success: true});
        });
    });

router.route('/tasks')

    .delete(function(req, res){
         sqlDB.removeTaks(req.body.id);
    })

    // create a task (accessed at POST /api/tasks)
    .post(function(req, res) {
        
        var id = req.body.id;
        if (id) {
            sqlDB.updateTask(id, req.body.title, req.body.description, req.body.state, req.body.from, req.body.to, req.body.project, req.body.milestone, req.body.user, function() {
                res.json({success: true});
            });
            
        } else{
            sqlDB.insertTask(req.body.title, req.body.description, req.body.state, req.body.from, req.body.to, req.body.project, req.body.milestone, req.body.user, function(id){
                res.json({success: true, id: id});
            });
        } 
    })

    // get all the tasks (accessed at GET /api/tasks)
    .get(function(req, res) {
        // res.json(tasks);
         sqlDB.findAllTasks(function(items) {
            res.json(items);
         });
    });

router.route('/tasks/:task_id')

    // get the task with that id (accessed at GET /api/tasks/:task_id)
    .get(function(req, res) {
        // res.json(tasks.filter(function(t){ return t.id == req.params.task_id})[0]); 
        sqlDB.findTask(req.params.task_id, function(items) {
           res.json(items);
        });
    }).put(function(req, res) {
        sqlDB.updateTask(req.params.task_id, req.body.title, req.body.description, req.body.state, req.body.from, req.body.to, req.body.project, req.body.milestone, req.body.user, function() {
                res.json({success: true});
            });
    });

router.route('/tasks/:task_id/problems')

    // get the task with that id (accessed at GET /api/tasks/:task_id)
    .post(function(req, res) {
        
        var id = req.body.id;
        if (id) {
            sqlDB.updateComment(id, req.user._id, req.params.task_id, "problem", req.body.text, req.body.state, null, function(id){
                res.json({success: true});
            }); 
        } else{
            sqlDB.insertComment(req.user._id, req.params.task_id, "problem", req.body.text, "open", null, function(id){
                res.json({success: true, id: id});
            });
        }
    })
    .get(function(req, res) {
        // res.json(comments.filter(function(c){ return c.taskId == req.params.task_id})); 
         sqlDB.findCommentsByTaskId(req.params.task_id, function(items) {
           res.json(items);
        });
    });

// ---------------------------------------------------------------------------------------
// ALL COMMENTS
router.route('/problems')
    // get all comments (accessed at GET /api/comments)
    .get(function(req, res) {
         sqlDB.findAllProblems(function(items) {
           res.json(items);
        });
    });

router.route('/problems/:problem_id/solutions')
    // get all comments (accessed at GET /api/comments)
    .get(function(req, res) {
         sqlDB.findAllSolutionsForProblem(req.params.problem_id, function(items) {
           res.json(items);
        });
    })
    .post(function(req, res) {
         sqlDB.insertComment(req.user._id, req.body.task, "solution", req.body.text, null, req.params.problem_id, function(id){
            res.json({success: true, id: id});
        });
    });

// PROBLEM WITH ID
router.route('/problems/:comment_id')
    // get the comment with that id (accessed at GET /api/comments/:comment_id)
    .get(function(req, res) {
         sqlDB.findComment(req.params.comment_id, function(items) {
           res.json(items);
        });
    }).put(function(req, res) {
        sqlDB.updateComment(req.params.comment_id, req.user._id, req.body.task_id, req.body.type, req.body.text, req.body.state, req.body.problem_id, function(id){
                res.json({success: true, id: id});
            }); 
    });

app.use('/api', router);

app.get("/projects/*", ensureAuthenticated, function(req,res,next){
  res.sendFile(path.resolve('./build/app/index.html'));
}); 
app.get("/tasks/*", ensureAuthenticated, function(req,res,next){
  res.sendFile(path.resolve('./build/app/index.html'));
});
app.get("/problems/*", ensureAuthenticated, function(req,res,next){
  res.sendFile(path.resolve('./build/app/index.html'));
});
app.get("/login/*",function(req,res,next){
  res.sendFile(path.resolve('./build/app/index.html'));
}); 
app.get("/",ensureAuthenticated,function(req,res,next){
  res.sendFile(path.resolve('./build/app/index.html'));
}); 
app.get("/index.html",ensureAuthenticated,function(req,res,next){
    console.log(req.user);
  res.sendFile(path.resolve('./build/app/index.html'));
}); 

app.use(express.static(path.resolve('./build/app')));

app.listen(process.env.PORT || 7777,function(){
    console.log("Started listening on port", process.env.PORT || 7777);
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

function nocache(req, res, next) {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
  next();
}