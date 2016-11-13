// require/import the mongodb native drivers
var mongodb = require('mongodb');

// "MongoClient" interface to connect to a mongodb server
var MongoClient = mongodb.MongoClient;

// Connection URL
var url = 'mongodb://localhost:27017/projectmanagement';

exports.findAllUsers = function(callback) {
    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
            console.log('Connection established to', url);

            var collection = db.collection('users');

            collection.find().toArray(function (err, result) {
                if (err) return console.log(err)
                callback(result);
            })
            db.close();
        }
    });
};

exports.insertUser = function(in_firstname, in_lastname, in_email, in_facebookID, callback) {
    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
            console.log('Connection established to', url);

            var collection = db.collection('users');    
            var user = {firstname: in_firstname, lastname: in_lastname, email: in_email, facebookID:in_facebookID };

            collection.insert(user, function (err, result) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('Inserted %d documents into the "users" collection. The documents inserted with "_id" are:', result.length, result);
                    callback(user._id, user);
                }

            db.close();
            });
        }
    });
};

exports.findUser = function(in_id, callback) {
    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
            console.log('Connection established to', url);

            var collection = db.collection('users');

            collection.find({_id: new mongodb.ObjectID(in_id)}).toArray(function (err, result) {
                if (err) return console.log(err)
                callback(result);
            })
            db.close(); 
        }
    });
};

exports.findUserByFb = function(in_facebookID, callback) {
    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
            console.log('Connection established to', url);

            var collection = db.collection('users');

            collection.find({facebookID: in_facebookID}).toArray(function (err, result) {
                if (err) return console.log(err)
                callback(result);
            })
            db.close(); 
        }
    });
};

exports.updateUser = function (in_id, in_firstname, in_lastname, in_email, in_facebookID, in_tasks) {
    
    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
            console.log('Connection established to', url);

            var collection = db.collection('users');    
            var user = {firstname: in_firstname, lastname: in_lastname, email: in_email, facebookID:in_facebookID, tasks:in_tasks};

            collection.update(
            { '_id' : new mongodb.ObjectID(in_id) }, 
                            { $set: { 
                            'firstname': in_firstname,
                            'lastname': in_lastname,
                            'email': in_email,
                            'facebookID': in_facebookID,
                            'tasks': in_tasks
                            } },
            function (err, result) {
                if (err) throw err;
                console.log(result);
            });

            db.close();
            
        }
    });
};

exports.removeUser = function(in_id) {
        MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
            console.log('Connection established to', url);

            var collection = db.collection('users');    

            collection.deleteOne({'_id': new mongodb.ObjectID(in_id)}, function(err, results) {
                if (err){
                    console.log(err);
                    throw err;
                }
                console.log(results);
            });   

            db.close();
            
        }
    });
};

// --------------------------------------------------------------------------------------------------------------

exports.insertMilestone = function(in_to, in_description, in_projectId, callback) {
    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
            console.log('Connection established to', url);

            var collection = db.collection('milestones');    
            var milestone = {to: in_to, description: in_description, projectId: new mongodb.ObjectID(in_projectId)};


            collection.insert(milestone, function (err, result) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('Inserted %d documents into the "milestones" collection. The documents inserted with "_id" are:', result.length, result);
                    callback(milestone._id);
            }

            db.close();
            });
        }
    });
};

exports.findMilestone = function(in_id, callback) {
    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
            console.log('Connection established to', url);

            var collection = db.collection('milestones');

            collection.find({_id: new mongodb.ObjectID(in_id)}).toArray(function (err, result) {
                if (err) return console.log(err)
                callback(result);
            })
            db.close();
        }
    });
};

exports.updateMilestone = function (in_id, in_to, in_description, in_projectId, callback) {
    
    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
            console.log('Connection established to', url);

            var collection = db.collection('milestones');    

            collection.update(
            { '_id' : new mongodb.ObjectID(in_id) }, 
                            { $set: { 
                            'to': in_to,
                            'description': in_description,
                            'projectId': new mongodb.ObjectID(in_projectId)
                            } },
            function (err, result) {
                if (err) throw err;
                console.log(result);
                callback();
            });

            db.close();
            
        }
    });
};

exports.findMilestoneByProjectId = function(in_projectId, callback) {
    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
            console.log('Connection established to', url);

            var collection = db.collection('milestones');

            collection.find({projectId: new mongodb.ObjectID(in_projectId)}).sort({to:1}).toArray(function (err, result) {
                if (err) return console.log(err)
                    callback(result);
            })
            db.close();
        }
    });
};
exports.findMilestoneById = function(in_milestoneId, callback) {
    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
            console.log('Connection established to', url);

            var collection = db.collection('milestones');

            collection.find({"_id": new mongodb.ObjectID(in_milestoneId)}).toArray(function (err, result) {
                if (err) return console.log(err)
                callback(result);
            })
            db.close();
        }
    });
};

exports.findAllMilestones = function(callback) {

    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
            console.log('Connection established to', url);

            var collection = db.collection('milestones');

            collection.find().sort({to:1}).toArray(function (err, result) {
                if (err) return console.log(err)
                callback(result);
            })
            db.close();
        }
    });
};

exports.removeMilestone = function(in_id) {
        MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
            console.log('Connection established to', url);

            var collection = db.collection('milestones');    

            collection.deleteOne({'_id': new mongodb.ObjectID(in_id)}, function(err, results) {
                if (err){
                    console.log(err);
                    throw err;
                }
                console.log(results);
            });   

            db.close();
            
        }
    });
};



 
// --------------------------------------------------------------------------------------------------------------

exports.insertProject = function (in_title, in_description, callback){
    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
            console.log('Connection established to', url);

            var collection = db.collection('projects');    
            var project = {title: in_title, description: in_description};

            collection.insert(project, function (err, result) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('Inserted %d documents into the "projects" collection. The documents inserted with "_id" are:', result.length, result);
                    callback(project._id);
                }

            db.close();
            });
        }
    });
};

exports.findProject = function(in_id, callback) {
    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
            console.log('Connection established to', url);

            var collection = db.collection('projects');

            collection.find({_id: new mongodb.ObjectID(in_id)}).toArray(function (err, result) {
                if (err) return console.log(err)
                callback(result);
            })
            db.close();
        }
    });
};


exports.findAllProjects = function(callback) {

    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
            console.log('Connection established to', url);

            var collection = db.collection('projects');

            collection.find().toArray(function (err, result) {
                if (err) return console.log(err)
                callback(result);
            })
            db.close();
        }
    });
};

exports.updateProject = function (in_id, in_title, in_description, callback) {
    
    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
            console.log('Connection established to', url);

            var collection = db.collection('projects');    

            collection.update(
            { '_id' : new mongodb.ObjectID(in_id) }, 
                            { $set: { 
                            'title': in_title,
                            'description': in_description
                            } },
            function (err, result) {
                if (err) throw err;
                console.log(result);
                callback();
            });

            db.close();
            
        }
    });
};

exports.removeProject = function(in_id) {
        MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
            console.log('Connection established to', url);

            var collection = db.collection('projects');    

            collection.deleteOne({'_id': new mongodb.ObjectID(in_id)}, function(err, results) {
                if (err){
                    console.log(err);
                    throw err;
                }
                console.log(resultsx);
            });   

            db.close();
            
        }
    });
};

// --------------------------------------------------------------------------------------------------------------

exports.insertTask = function (in_title, in_description, in_state, in_from, in_to, in_project, in_milestone, in_user, callback){
    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
            console.log('Connection established to', url);

            var collection = db.collection('tasks');    
            var task = {
                title: in_title, 
                description: in_description, 
                state: in_state, 
                from: in_from, 
                to: in_to, 
                project: new mongodb.ObjectID(in_project), 
                milestone: new mongodb.ObjectID(in_milestone), 
                user:new mongodb.ObjectID(in_user)
            };

            collection.insert(task, function (err, result) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('Inserted %d documents into the "tasks" collection. The documents inserted with "_id" are:', result.length, result);
                    callback(task._id);
            }

            db.close();
            
            });
        }
    });
};

exports.findTask = function(in_id, callback) {
    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
            console.log('Connection established to', url);

            var collection = db.collection('tasks');

             collection.find({_id: new mongodb.ObjectID(in_id)}).toArray(function (err, result) {
                if (err) return console.log(err)
                callback(result);
            })
            db.close();
        }
    });
};
exports.findTaskByMilestoneID = function(in_milestoneId, callback) {
    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
            console.log('Connection established to', url);

            var collection = db.collection('tasks');

            collection.find({milestone: new mongodb.ObjectID(in_milestoneId)}).toArray(function (err, result) {
                if (err) return console.log(err)
                    callback(result);
            })
            db.close();
        }
    });
};

exports.findCommentsByTaskId = function(in_taskId, callback) {
    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
            console.log('Connection established to', url);

            var collection = db.collection('comments');

             collection.find({task: new mongodb.ObjectID(in_taskId)}).toArray(function (err, result) {
                if (err) return console.log(err)
                callback(result);
            })
            db.close();
        }
    });
};

exports.updateTask = function (in_id, in_title, in_description, in_state, in_from, in_to, in_project, in_milestone, in_user, callback) {
    
    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
            console.log('Connection established to', url);

            var collection = db.collection('tasks');    

            collection.update(
            { '_id' : new mongodb.ObjectID(in_id) }, 
                            { $set: { 
                            'title': in_title,
                            'description': in_description,
                            'state':in_state,
                            'from':in_from,
                            'to':in_to,
                            'project': new mongodb.ObjectID(in_project),
                            'milestone': new mongodb.ObjectID(in_milestone),
                            'user': new mongodb.ObjectID(in_user)
                            } },
            function (err, result) {
                if (err) throw err;
                console.log(result);
                callback();
            });

            db.close();
            
        }
    });
};

exports.findAllTasks = function(callback) {

    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
            console.log('Connection established to', url);

            var collection = db.collection('tasks');

            collection.find().toArray(function (err, result) {
                if (err) return console.log(err)
                callback(result);
            })
            db.close();
         }
    });
};

exports.removeTasks = function(in_id) {
        MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
            console.log('Connection established to', url);

            var collection = db.collection('tasks');    

            collection.deleteOne({'_id': new mongodb.ObjectID(in_id)}, function(err, results) {
                if (err){
                    console.log(err);
                    throw err;
                }
                console.log(resultsx);
            });   

            db.close();
        }
    });
};

// --------------------------------------------------------------------------------------------------------------

exports.insertComment = function (in_user, in_task, in_type, in_text, in_state, in_problem, callback){
    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
            console.log('Connection established to', url);

            var collection = db.collection('comments');    
            var comment = {
                user: in_user ? new mongodb.ObjectID(in_user) : null, 
                task: in_task ? new mongodb.ObjectID(in_task) : null, 
                type: in_type, 
                text: in_text, 
                state: in_state, 
                problem: in_problem ? new mongodb.ObjectID(in_problem) : null
            };

            collection.insert(comment, function (err, result) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('Inserted %d documents into the "comments" collection. The documents inserted with "_id" are:', result.length, result);
                    callback(comment._id);
                }

                db.close();
            });
        }
    });
};

exports.findComment = function(in_id, callback) {
    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
            console.log('Connection established to', url);

            var collection = db.collection('comments');

            collection.find({_id: new mongodb.ObjectID(in_id)}).toArray(function (err, result) {
                if (err) return console.log(err)
                callback(result);
            })
            db.close();
        }
    });
};

//all comments
exports.findAllComments = function(callback) {

    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
            console.log('Connection established to', url);

            var collection = db.collection('comments');

            collection.find().sort({state:1}).toArray(function (err, result) {
                if (err) return console.log(err)
                callback(result);
            })
            db.close();
        }
    });
};

exports.findAllProblems = function(callback) {

    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
            console.log('Connection established to', url);

            var collection = db.collection('comments');

            collection.find({type: "problem"}).sort({state:-1}).toArray(function (err, result) {
                if (err) return console.log(err)
                callback(result);
            })
            db.close();
        }
    });
};

exports.findAllSolutionsForProblem = function(problemId, callback) {

    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
            console.log('Connection established to', url);

            var collection = db.collection('comments');

            collection.find({type: "solution", problem: new mongodb.ObjectID(problemId)}).toArray(function (err, result) {
                if (err) return console.log(err)
                callback(result);
            })
            db.close();
        }
    });
};

exports.updateComment = function (in_id, in_user, in_task, in_type, in_text, in_state, in_problem, callback) {
    
    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
            console.log('Connection established to', url);

            var collection = db.collection('comments');    

            collection.update(
            { '_id' : new mongodb.ObjectID(in_id) }, 
                            { $set: { 
                            'user': new mongodb.ObjectID(in_user),
                            'task': new mongodb.ObjectID(in_task),
							'type': in_type,
                            'text': in_text,
                            'state': in_state,
                            'problem': new mongodb.ObjectID(in_problem)
                            } },
            function (err, result) {
                if (err) throw err;
                console.log(result);
                callback();
            });

            db.close();
            
        }
    });
};

exports.removeComment = function(in_id) {
        MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
            console.log('Connection established to', url);

            var collection = db.collection('comments');    

            collection.deleteOne({'_id': new mongodb.ObjectID(in_id)}, function(err, results) {
                if (err){
                    console.log(err);
                    throw err;
                }
                console.log(resultsx);
            });   

            db.close();
            
        }
    });
};