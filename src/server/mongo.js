// require/import the mongodb native drivers
var mongodb = require('mongodb');

// "MongoClient" interface to connect to a mongodb server
var MongoClient = mongodb.MongoClient;

// Connection URL
var url = 'mongodb://localhost:27017/projectmanagement';

exports.insertUser = function(in_firstname, in_lastname, in_email, in_facebookID, in_tasks, callback) {
    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
            console.log('Connection established to', url);

            var collection = db.collection('users');    
            var user = {firstname: in_firstname, lastname: in_lastname, email: in_email, facebookID:in_facebookID, tasks:in_tasks};


            collection.insert(user, function (err, result) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('Inserted %d documents into the "users" collection. The documents inserted with "_id" are:', result.length, result);
                    callback(user._id);
        }

            db.close();
            });
        }
    });
};

exports.findUser = function(in_id) {
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

exports.insertMilestone = function(in_from, in_to, in_description, in_projectId, in_tasks, callback) {
    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
            console.log('Connection established to', url);

            var collection = db.collection('milestones');    
            var milestone = {from: in_from, to: in_to, description: in_description, projectId: in_projectId, tasks:in_tasks};


            collection.insert(milestone, function (err, result) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('Inserted %d documents into the "milestones" collection. The documents inserted with "_id" are:', result.length, result);
                    callback(result._id);
            }

            db.close();
            });
        }
    });
};

exports.findMilestone = function(in_id) {
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

exports.updateMilestone = function (in_id, in_from, in_to, in_description, in_projectId, in_tasks) {
    
    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
            console.log('Connection established to', url);

            var collection = db.collection('milestones');    

            collection.update(
            { '_id' : new mongodb.ObjectID(in_id) }, 
                            { $set: { 
                            'from': in_from,
                            'to': in_to,
                            'description': in_description,
                            'projectId': in_projectId,
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

exports.findMilestoneByProjectId = function(in_projectId, callback) {
    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
            console.log('Connection established to', url);

            var collection = db.collection('milestones');

            collection.find({projectId: new mongodb.ObjectID(in_projectId)}).toArray(function (err, result) {
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

            collection.find().toArray(function (err, result) {
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

exports.updateProject = function (in_id, in_title, in_description) {
    
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

exports.insertTask = function (in_title, in_description, in_state, in_from, in_to, in_milestone, in_user, in_problem, in_comment, callback){
    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
            console.log('Connection established to', url);

            var collection = db.collection('tasks');    
            var task = {title: in_title, description: in_description, state: in_state, from: in_from, to: in_to, milestone: in_milestone, user:in_user, problem:in_problem, comment:in_comment};


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

exports.findCommentsByTaskId = function(in_taskId, callback) {
    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
            console.log('Connection established to', url);

            var collection = db.collection('comments');

             collection.find({taskId: new mongodb.ObjectID(in_taskId)}).toArray(function (err, result) {
                if (err) return console.log(err)
                callback(result);
            })
            db.close();
        }
    });
};

exports.updateTask = function (in_id, in_title, in_description, in_state, in_from, in_to, in_milestone, in_user, in_problem, in_comment) {
    
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
                            'milestone': in_milestone,
                            'user': in_user,
                            'problem':in_problem,
                            'comment':in_comment
                            } },
            function (err, result) {
                if (err) throw err;
                console.log(result);
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

exports.insertComment = function (in_user, in_task, in_type, in_text, in_state){
    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
            console.log('Connection established to', url);

            var collection = db.collection('comments');    
            var comment = {user: in_user, task: in_task, type: in_type, text: in_text, state: in_state};


            collection.insert(comment, function (err, result) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('Inserted %d documents into the "comments" collection. The documents inserted with "_id" are:', result.length, result);
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

            collection.find().toArray(function (err, result) {
                if (err) return console.log(err)
                callback(result);
            })
            db.close();
        }
    });
};

exports.updateComment = function (in_id, in_user, in_task, in_type, in_text, in_state) {
    
    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
            console.log('Connection established to', url);

            var collection = db.collection('comments');    

            collection.update(
            { '_id' : new mongodb.ObjectID(in_id) }, 
                            { $set: { 
                            'user': in_user,
                            'task': in_task,
							'type': in_type,
                            'text': in_text,
                            'state': in_state
                            } },
            function (err, result) {
                if (err) throw err;
                console.log(result);
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
