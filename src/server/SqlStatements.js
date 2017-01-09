
var config = {  
        userName: 'sepm_admin',
	    password: '@Password66',
        server: 'sepmdb.database.windows.net',  
        // If you are on Microsoft Azure, you need this:  
        options: {encrypt: true, database: 'sepm_db'}  
    };  

var Connection = require('tedious').Connection;  
var Request = require('tedious').Request;  
var TYPES = require('tedious').TYPES;  


function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}
// --------------------------------------------------------------------------------------------------------------
// USERS
// --------------------------------------------------------------------------------------------------------------

exports.findAllUsers = function(callback) {
    
    var connection = new Connection(config);  
    connection.on('connect', function(err) {  
        // If no error, then good to proceed.  
        console.log("Connected");
        if (err) {  
            console.log(err);
        }  
        
        executeStatement();  
    }); 

    function executeStatement() {  
        request = new Request("SELECT * FROM Users;", function(err) {  
        if (err) {  
            console.log(err);}  
        });  
        var result = [];
        request.on('row', function(columns) {  
            var obj = {};
            columns.forEach(function(column) {  
              if (column.value === null) {  
                  
              } else { 
                  console.log(column); 
                obj[column.metadata.colName] = column.value;  
              }  
            }); 
            result.push(obj); 
            console.log(result); 
        });  
  
        request.on('doneInProc', function(rowCount, more) {  
            console.log(rowCount + ' rows returned');
            callback(result);  
        });  
        connection.execSql(request);  
    }  
    
};

exports.insertUser = function(facebookId, in_firstname, in_lastname, in_email, callback) {
    
    var connection = new Connection(config);
    var uid = guid();  
    connection.on('connect', function(err) {  
        console.log("Connected");
        if (err) {  
            console.log(err);
        }  
        executeStatement(); 
    }); 


    function executeStatement() {  
        request = new Request("INSERT INTO Users VALUES (@in_ID, @in_firstname, @in_lastname, @in_email, @facebookId);", function(err) {  
         if (err) {  
            console.log(err);}  
        });  
        request.addParameter('in_ID', TYPES.NVarChar,uid);  
        request.addParameter('in_firstname', TYPES.NVarChar , in_firstname);  
        request.addParameter('in_lastname', TYPES.NVarChar, in_lastname);  
        request.addParameter('in_email', TYPES.NVarChar,in_email);  
        request.addParameter('facebookId', TYPES.NVarChar,facebookId);  
        request.on('row', function(columns) {  
            columns.forEach(function(column) {  
              if (column.value === null) {  
                console.log('NULL');  
              } else {  
                console.log("Id of inserted User is " + column.value);  
              }  
            });  
        });       
        
        request.on('doneInProc', function(rowCount, more) {  
            console.log(rowCount + ' rows returned');
            callback(uid);  
        });  
        connection.execSql(request);   
    }  
    
};

exports.findUserByFbId = function(in_ID, callback) {

    var connection = new Connection(config);  
    connection.on('connect', function(err) {  
        console.log("Connected");
        if (err) {  
            console.log(err);
        }  
        executeStatement();  
    }); 

    function executeStatement() {  
        request = new Request("SELECT * FROM Users WHERE facebookId = @in_ID;", function(err) {  
        if (err) {  
            console.log(err);}  
        });
        request.addParameter('in_ID', TYPES.NVarChar,in_ID);  
        var result = [];
        request.on('row', function(columns) {  
            var obj = {};
            columns.forEach(function(column) {  
              if (column.value === null) {  
                  
              } else { 
                  console.log(column); 
                obj[column.metadata.colName] = column.value;  
              }  
            }); 
            result.push(obj); 
            console.log(result); 
        });  
  
        request.on('doneInProc', function(rowCount, more) {  
            console.log(rowCount + ' rows returned');
            callback(result);  
        });  
        connection.execSql(request);  
    }  
	
};

exports.updateUser = function (in_id, in_firstname, in_lastname, in_email, in_facebookId, in_tasks) {
    
   var connection = new Connection(config);
    var uid = guid();  
    connection.on('connect', function(err) {  
        console.log("Connected");
        if (err) {  
            console.log(err);
        }  
        executeStatement(); 
    }); 


    function executeStatement() {  
        request = new Request("UPDATE Users SET firstname = @in_firstname, lastname = @in_lastname, email = @in_email, facebookId = @in_facebookId WHERE id = @in_ID;"
, function(err) {  
         if (err) {  
            console.log(err);}  
        });  
        request.addParameter('in_ID', TYPES.NVarChar,in_id);  
        request.addParameter('in_firstname', TYPES.NVarChar , in_firstname);  
        request.addParameter('in_lastname', TYPES.NVarChar, in_lastname);  
        request.addParameter('in_email', TYPES.NVarChar,in_email);          
        request.addParameter('in_facebookId', TYPES.NVarChar,in_facebookId);  
        request.on('row', function(columns) {  
            columns.forEach(function(column) {  
              if (column.value === null) {  
                console.log('NULL');  
              } else {  
                console.log("Id of updated User is " + column.value);  
              }  
            });  
        });       
        
        request.on('doneInProc', function(rowCount, more) {  
            console.log(rowCount + ' rows returned');
            callback(in_id);  
        });  
        connection.execSql(request);   
    }  
    
};



// --------------------------------------------------------------------------------------------------------------
// MILESTONE
// --------------------------------------------------------------------------------------------------------------


exports.insertMilestone = function(in_to, in_description, in_projectId, callback) {
    
	 var connection = new Connection(config);  
    connection.on('connect', function(err) {  
        console.log("Connected");
        if (err) {  
            console.log(err);
        }  
        executeStatement(); 
    }); 


    function executeStatement() {  
        request = new Request("INSERT INTO Milestone VALUES (@in_ID, @in_to, @in_description, @in_projectId);", function(err) {  
         if (err) {  
            console.log(err);}  
        });  
        request.addParameter('in_ID', TYPES.NVarChar,uid);  
        request.addParameter('in_to', TYPES.NVarChar , in_to);  
        request.addParameter('in_description', TYPES.NVarChar, in_description);  
        request.addParameter('in_projectId', TYPES.NVarChar, in_projectId);
        request.on('row', function(columns) {  
            columns.forEach(function(column) {  
              if (column.value === null) {  
                console.log('NULL');  
              } else {  
                console.log("Id of inserted Milestone is " + column.value);  
              }  
            });  
        });       
        request.on('doneInProc', function(rowCount, more) {  
            console.log(rowCount + ' rows returned');
            callback(uid);  
        });  
        connection.execSql(request);  
    }  
};

exports.findMilestone = function(in_id, callback) {
  var connection = new Connection(config);  
    connection.on('connect', function(err) {  
        // If no error, then good to proceed.  
        console.log("Connected");
        if (err) {  
            console.log(err);
        }  
        
        executeStatement();  
    }); 

    function executeStatement() {  
        request = new Request("SELECT * FROM Milestone WHERE id = @in_milestoneId;", function(err) {  
        if (err) {  
            console.log(err);}  
        });  
        request.addParameter('in_milestoneId', TYPE.NVarChar, in_id);
        var result = [];
        request.on('row', function(columns) {  
            var obj = {};
            columns.forEach(function(column) {  
              if (column.value === null) {  
                  
              } else { 
                    console.log(column); 
                    obj[column.metadata.colName] = column.value;  
              }  
            }); 
            result.push(obj); 
            console.log(result); 
        });  
  
        request.on('doneInProc', function(rowCount, more) {  
            console.log(rowCount + ' rows returned');
            callback(result);  
        });  
        connection.execSql(request);  
    } };

exports.updateMilestone = function (in_id, in_to, in_description, in_projectId, callback) {
    
    
	 var connection = new Connection(config);  
    connection.on('connect', function(err) {  
        console.log("Connected");
        if (err) {  
            console.log(err);
        }  
        executeStatement(); 
    }); 


    function executeStatement() {  
        request = new Request("UPDATE Milestone SET to = @in_to, description = @in_description, project = @in_projectId WHERE id = @in_id;", function(err) {  
         if (err) {  
            console.log(err);}  
        });  
        request.addParameter('in_ID', TYPES.NVarChar,in_id);  
        request.addParameter('in_to', TYPES.NVarChar , in_to);  
        request.addParameter('in_description', TYPES.NVarChar, in_description);  
        request.addParameter('in_projectId', TYPES.NVarChar, in_projectId);
        request.on('row', function(columns) {  
            columns.forEach(function(column) {  
              if (column.value === null) {  
                console.log('NULL');  
              } else {  
                console.log("Id of updated Milestone is " + column.value);  
              }  
            });  
        });       
        request.on('doneInProc', function(rowCount, more) {  
            console.log(rowCount + ' rows returned');
            callback(in_id);  
        });  
        connection.execSql(request);  
    }  
};

exports.findMilestoneByProjectId = function(in_projectId, callback) {
    var connection = new Connection(config);  
    connection.on('connect', function(err) {  
        // If no error, then good to proceed.  
        console.log("Connected");
        if (err) {  
            console.log(err);
        }  
        
        executeStatement();  
    }); 

    function executeStatement() {  
        request = new Request("SELECT * FROM Milestone WHERE id = @in_projectId;", function(err) {  
        if (err) {  
            console.log(err);}  
        });  
        request.addParameter('in_projectId', TYPES.NVarChar, in_projectId);
        var result = [];
        request.on('row', function(columns) {  
            var obj = {};
            columns.forEach(function(column) {  
              if (column.value === null) {  
                  
              } else { 
                  console.log(column); 
                obj[column.metadata.colName] = column.value;  
              }  
            }); 
            result.push(obj); 
            console.log(result); 
        });  
  
        request.on('doneInProc', function(rowCount, more) {  
            console.log(rowCount + ' rows returned');
            callback(result);  
        });  
        connection.execSql(request);  
    } 
};
exports.findMilestoneById = function(in_milestoneId, callback) {
    var connection = new Connection(config);  
    connection.on('connect', function(err) {  
        console.log("Connected");
        if (err) {  
            console.log(err);
        }  
        
        executeStatement();  
    }); 

    function executeStatement() {  
        request = new Request("SELECT * FROM Milestone WHERE id = @in_milestoneId;", function(err) {  
        if (err) {  
            console.log(err);}  
        });  
        request.addParameter('in_milestoneId', TYPES.NVarChar, in_milestoneId);
        var result = [];
        request.on('row', function(columns) {  
            var obj = {};
            columns.forEach(function(column) {  
              if (column.value === null) {  
                  
              } else { 
                  console.log(column); 
                obj[column.metadata.colName] = column.value;  
              }  
            }); 
            result.push(obj); 
            console.log(result); 
        });  
  
        request.on('doneInProc', function(rowCount, more) {  
            console.log(rowCount + ' rows returned');
            callback(result);  
        });  
        connection.execSql(request);  
    }  
};

exports.findAllMilestones = function(callback) {

	var connection = new Connection(config);  
    connection.on('connect', function(err) {  
        console.log("Connected");
        if (err) {  
            console.log(err);
        }  
        
        executeStatement();  
    }); 

    function executeStatement() {  
        request = new Request("SELECT * FROM Milestone;", function(err) {  
        if (err) {  
            console.log(err);}  
        });  
        var result = [];
        request.on('row', function(columns) {  
            var obj = {};
            columns.forEach(function(column) {  
              if (column.value === null) {  
                  
              } else { 
                  console.log(column); 
                obj[column.metadata.colName] = column.value;  
              }  
            }); 
            result.push(obj); 
            console.log(result); 
        });  
  
        request.on('doneInProc', function(rowCount, more) {  
            console.log(rowCount + ' rows returned');
            callback(result);  
        });  
        connection.execSql(request);  
    }  
};

 
// --------------------------------------------------------------------------------------------------------------
// PROJECT
// --------------------------------------------------------------------------------------------------------------

exports.insertProject = function (in_title, in_description, callback){
    
    var connection = new Connection(config);
    var uid = guid();  
    connection.on('connect', function(err) {  
        console.log("Connected");
        if (err) {  
            console.log(err);
        }  
        executeStatement(); 
    }); 


    function executeStatement() {  
        request = new Request("INSERT INTO Project VALUES (@in_ID, @in_title, @in_description);", function(err) {  
         if (err) {  
            console.log(err);}  
        });  
        request.addParameter('in_ID', TYPES.NVarChar,uid);  
        request.addParameter('in_title', TYPES.NVarChar , in_title);  
        request.addParameter('in_description', TYPES.NVarChar, in_description);  
        request.on('row', function(columns) {  
            columns.forEach(function(column) {  
              if (column.value === null) {  
                console.log('NULL');  
              } else {  
                console.log("Id of inserted user is " + column.value);  
              }  
            });  
        });       
        request.on('doneInProc', function(rowCount, more) {  
            console.log(rowCount + ' rows returned');
            callback(uid);  
        });  
        connection.execSql(request);    
    }  
};

exports.findProject = function(in_id, callback) {
    var connection = new Connection(config);  
    connection.on('connect', function(err) {  
        console.log("Connected");
        if (err) {  
            console.log(err);
        }  
        
        executeStatement();  
    }); 

    function executeStatement() {  
        request = new Request("SELECT * FROM Project WHERE id = @in_projectId;", function(err) {  
        if (err) {  
            console.log(err);}  
        });  

        request.addParameter('in_projectId', TYPES.NVarChar, in_id);
        var result = [];
        request.on('row', function(columns) {  
            var obj = {};
            columns.forEach(function(column) {  
              if (column.value === null) {  
                  
              } else { 
                  console.log(column); 
                obj[column.metadata.colName] = column.value;  
              }  
            }); 
            result.push(obj); 
            console.log(result); 
        });  
  
        request.on('doneInProc', function(rowCount, more) {  
            console.log(rowCount + ' rows returned');
            callback(result);  
        });  
        connection.execSql(request);  
    } 
};


exports.findAllProjects = function(callback) {

var connection = new Connection(config);  
    connection.on('connect', function(err) {  
        console.log("Connected");
        if (err) {  
            console.log(err);
        }  
        
        executeStatement();  
    }); 

    function executeStatement() {  
        request = new Request("SELECT * FROM Project;", function(err) {  
        if (err) {  
            console.log(err);}  
        });  
        var result = [];
        request.on('row', function(columns) {  
            var obj = {};
            columns.forEach(function(column) {  
              if (column.value === null) {  
                  
              } else { 
                  console.log(column); 
                obj[column.metadata.colName] = column.value;  
              }  
            }); 
            result.push(obj); 
            console.log(result); 
        });  
  
        request.on('doneInProc', function(rowCount, more) {  
            console.log(rowCount + ' rows returned');
            callback(result);  
        });  
        connection.execSql(request);  
    }  
};

exports.updateProject = function (in_id, in_title, in_description, callback) {
    
   var connection = new Connection(config);
    var uid = guid();  
    connection.on('connect', function(err) {  
        console.log("Connected");
        if (err) {  
            console.log(err);
        }  
        executeStatement(); 
    }); 


    function executeStatement() {  
        request = new Request("UPDATE Project SET title = @in_title, description = @in_description WHERE id = @in_id;", function(err) {  
         if (err) {  
            console.log(err);}  
        });  
        request.addParameter('in_ID', TYPES.NVarChar,in_id);  
        request.addParameter('in_title', TYPES.NVarChar , in_title);  
        request.addParameter('in_description', TYPES.NVarChar, in_description);  
        request.on('row', function(columns) {  
            columns.forEach(function(column) {  
              if (column.value === null) {  
                console.log('NULL');  
              } else {  
                console.log("Id of updated user is " + column.value);  
              }  
            });  
        });       
        request.on('doneInProc', function(rowCount, more) {  
            console.log(rowCount + ' rows returned');
            callback(uid);  
        });  
        connection.execSql(request);    
    }  
};


// --------------------------------------------------------------------------------------------------------------
// TASKS
// --------------------------------------------------------------------------------------------------------------

exports.insertTask = function (in_title, in_description, in_state, in_from, in_to, in_project, in_milestone, in_user, callback){
    var connection = new Connection(config); 
    var uid = guid(); 
    connection.on('connect', function(err) {  
        console.log("Connected");
        if (err) {  
            console.log(err);
        }  
        executeStatement(); 
    }); 


    function executeStatement() {  
        request = new Request("INSERT INTO Task VALUES (@in_ID, @in_title, @in_description, @in_state, @in_from, @in_to, @in_project, @in_milestone, @in_user);", function(err) {  
         if (err) {  
            console.log(err);}  
        });  
        request.addParameter('in_ID', TYPES.NVarChar,uid);  
        request.addParameter('in_title', TYPES.NVarChar , in_title);  
        request.addParameter('in_description', TYPES.NVarChar, in_description); 
        request.addParameter('in_state', TYPES.NVarChar, in_state);  
        request.addParameter('in_from', TYPES.NVarChar, in_from);  
        request.addParameter('in_to', TYPES.NVarChar, in_to);  
        request.addParameter('in_project', TYPES.NVarChar, in_project);
        request.addParameter('in_milestone', TYPES.NVarChar, in_milestone);
        request.addParameter('in_user', TYPES.NVarChar, in_user);       
        request.on('row', function(columns) {  
            columns.forEach(function(column) {  
              if (column.value === null) {  
                console.log('NULL');  
              } else {  
                console.log("Id of inserted Task is " + column.value);  
              }  
            });  
        });       
        request.on('doneInProc', function(rowCount, more) {  
            console.log(rowCount + ' rows returned');
            callback(uid);  
        });  
        connection.execSql(request);  
    }  
};

exports.findTask = function(in_id, callback) {
     var connection = new Connection(config);  
    connection.on('connect', function(err) {  
        console.log("Connected");
        if (err) {  
            console.log(err);
        }  
        
        executeStatement();  
    }); 

    function executeStatement() {  
        request = new Request("SELECT * FROM Task WHERE id = @in_taskId;", function(err) {  
        if (err) {  
            console.log(err);}  
        });  
        request.addParameter('in_taskId', TYPES.NVarChar, in_id);
        var result = [];
        request.on('row', function(columns) {  
            var obj = {};
            columns.forEach(function(column) {  
              if (column.value === null) {  
                  
              } else { 
                  console.log(column); 
                obj[column.metadata.colName] = column.value;  
              }  
            }); 
            result.push(obj); 
            console.log(result); 
        });  
  
        request.on('doneInProc', function(rowCount, more) {  
            console.log(rowCount + ' rows returned');
            callback(result);  
        });  
        connection.execSql(request);  
    } 
};
exports.findTaskByMilestoneID = function(in_milestoneId, callback) {
      var connection = new Connection(config);  
    connection.on('connect', function(err) {  
        console.log("Connected");
        if (err) {  
            console.log(err);
        }  
        
        executeStatement();  
    }); 

    function executeStatement() {  
        request = new Request("SELECT * FROM Task WHERE milestone = @in_milestoneId;", function(err) {  
        if (err) {  
            console.log(err);}  
        });  
        request.addParameter('in_milestoneId', TYPES.NVarChar, in_milestoneId);
        var result = [];
        request.on('row', function(columns) {  
            var obj = {};
            columns.forEach(function(column) {  
              if (column.value === null) {  
                  
              } else { 
                  console.log(column); 
                obj[column.metadata.colName] = column.value;  
              }  
            }); 
            result.push(obj); 
            console.log(result); 
        });  
  
        request.on('doneInProc', function(rowCount, more) {  
            console.log(rowCount + ' rows returned');
            callback(result);  
        });  
        connection.execSql(request);  
    } 
};

exports.findCommentsByTaskId = function(in_taskId, callback) {
  var connection = new Connection(config);  
    connection.on('connect', function(err) {  
        console.log("Connected");
        if (err) {  
            console.log(err);
        }  
        
        executeStatement();  
    }); 

    function executeStatement() {  
        request = new Request("SELECT * FROM Comment WHERE task = @in_taskId;", function(err) {  
        if (err) {  
            console.log(err);}  
        });  
        request.addParameter('in_taskId', TYPES.NVarChar, in_taskId);
        var result = [];
        request.on('row', function(columns) {  
            var obj = {};
            columns.forEach(function(column) {  
              if (column.value === null) {  
                  
              } else { 
                  console.log(column); 
                obj[column.metadata.colName] = column.value;  
              }  
            }); 
            result.push(obj); 
            console.log(result); 
        });  
  
        request.on('doneInProc', function(rowCount, more) {  
            console.log(rowCount + ' rows returned');
            callback(result);  
        });  
        connection.execSql(request);  
    } };

exports.updateTask = function (in_id, in_title, in_description, in_state, in_from, in_to, in_project, in_milestone, in_user, callback) {
    
var connection = new Connection(config); 
    var uid = guid(); 
    connection.on('connect', function(err) {  
        console.log("Connected");
        if (err) {  
            console.log(err);
        }  
        executeStatement(); 
    }); 


    function executeStatement() {  
        request = new Request("UPDATE Task SET title = @in_title, description = @in_description, state = @in_state, from = @in_from, to = @in_to, project = @in_project, milestone = @in_milestone, user = @in_user WHERE id = @in_id;", function(err) {  
         if (err) {  
            console.log(err);}  
        });  
        request.addParameter('in_ID', TYPES.NVarChar,in_id);  
        request.addParameter('in_title', TYPES.NVarChar , in_title);  
        request.addParameter('in_description', TYPES.NVarChar, in_description); 
        request.addParameter('in_state', TYPES.NVarChar, in_state);  
        request.addParameter('in_from', TYPES.NVarChar, in_from);  
        request.addParameter('in_to', TYPES.NVarChar, in_to);  
        request.addParameter('in_project', TYPES.NVarChar, in_project);
        request.addParameter('in_milestone', TYPES.NVarChar, in_milestone);
        request.addParameter('in_user', TYPES.NVarChar, in_user);       
        request.on('row', function(columns) {  
            columns.forEach(function(column) {  
              if (column.value === null) {  
                console.log('NULL');  
              } else {  
                console.log("Id of updated Task is " + column.value);  
              }  
            });  
        });       
        request.on('doneInProc', function(rowCount, more) {  
            console.log(rowCount + ' rows returned');
            callback(in_id);  
        });  
        connection.execSql(request);  
    }  
};

exports.findAllTasks = function(callback) {

    var connection = new Connection(config);  
    connection.on('connect', function(err) {  
        console.log("Connected");
        if (err) {  
            console.log(err);
        }  
        
        executeStatement();  
    }); 

    function executeStatement() {  
        request = new Request("SELECT * FROM Task;", function(err) {  
        if (err) {  
            console.log(err);}  
        });  
        var result = [];
        request.on('row', function(columns) {  
            var obj = {};
            columns.forEach(function(column) {  
              if (column.value === null) {  
                  
              } else { 
                  console.log(column); 
                obj[column.metadata.colName] = column.value;  
              }  
            }); 
            result.push(obj); 
            console.log(result); 
        });  
  
        request.on('doneInProc', function(rowCount, more) {  
            console.log(rowCount + ' rows returned');
            callback(result);  
        });  
        connection.execSql(request);  
    } 
};



// --------------------------------------------------------------------------------------------------------------
// COMMENTS
// --------------------------------------------------------------------------------------------------------------

exports.insertComment = function (in_user, in_task, in_type, in_text, in_state, in_problem, callback){
    var connection = new Connection(config); 
    var uid = guid(); 
    connection.on('connect', function(err) {  
        console.log("Connected");
        if (err) {  
            console.log(err);
        }  
        executeStatement(); 
    }); 


    function executeStatement() {  
        request = new Request("INSERT INTO Comment VALUES (in_ID, in_user, in_task, in_type, in_text, in_state, in_problem);", function(err) {  
         if (err) {  
            console.log(err);}  
        });  
        request.addParameter('in_ID', TYPES.NVarChar,uid);  
        request.addParameter('in_user', TYPES.NVarChar , in_user);  
        request.addParameter('in_task', TYPES.NVarChar, in_task); 
        request.addParameter('in_type', TYPES.NVarChar, in_type);  
        request.addParameter('in_text', TYPES.NVarChar, in_text);  
        request.addParameter('in_state', TYPES.NVarChar, in_state);  
        request.addParameter('in_problem', TYPES.NVarChar, in_problem);
        request.on('row', function(columns) {  
            columns.forEach(function(column) {  
              if (column.value === null) {  
                console.log('NULL');  
              } else {  
                console.log("Id of inserted Comment is " + column.value);  
              }  
            });  
        });       
        request.on('doneInProc', function(rowCount, more) {  
            console.log(rowCount + ' rows returned');
            callback(uid);  
        });  
        connection.execSql(request);  
    }  
};



exports.findComment = function(in_id, callback) {
  var connection = new Connection(config);  
    connection.on('connect', function(err) {  
        console.log("Connected");
        if (err) {  
            console.log(err);
        }  
        
        executeStatement();  
    }); 

    function executeStatement() {  
        request = new Request("SELECT * FROM Comment WHERE id = @in_commentId;", function(err) {  
        if (err) {  
            console.log(err);}  
        });  
        request.addParameter('in_commentId', TYPES.NVarChar, in_id);
        var result = [];
        request.on('row', function(columns) {  
            var obj = {};
            columns.forEach(function(column) {  
              if (column.value === null) {  
                  
              } else { 
                  console.log(column); 
                obj[column.metadata.colName] = column.value;  
              }  
            }); 
            result.push(obj); 
            console.log(result); 
        });  
  
        request.on('doneInProc', function(rowCount, more) {  
            console.log(rowCount + ' rows returned');
            callback(result);  
        });  
        connection.execSql(request);  
    } };

exports.findAllComments = function(callback) {

   var connection = new Connection(config);  
    connection.on('connect', function(err) {  
        console.log("Connected");
        if (err) {  
            console.log(err);
        }  
        
        executeStatement();  
    }); 

    function executeStatement() {  
        request = new Request("SELECT * FROM Comment;", function(err) {  
        if (err) {  
            console.log(err);}  
        });  
        var result = [];
        request.on('row', function(columns) {  
            var obj = {};
            columns.forEach(function(column) {  
              if (column.value === null) {  
                  
              } else { 
                  console.log(column); 
                obj[column.metadata.colName] = column.value;  
              }  
            }); 
            result.push(obj); 
            console.log(result); 
        });  
  
        request.on('doneInProc', function(rowCount, more) {  
            console.log(rowCount + ' rows returned');
            callback(result);  
        });  
        connection.execSql(request);  
    } 
};

// --------------------------------------------------------------------------------------------------------------
// PROBLEMS
// --------------------------------------------------------------------------------------------------------------

exports.findAllProblems = function(callback) {

    var connection = new Connection(config);  
    connection.on('connect', function(err) {  
        console.log("Connected");
        if (err) {  
            console.log(err);
        }  
        
        executeStatement();  
    }); 

    function executeStatement() {  
        request = new Request("SELECT * FROM Problem;", function(err) {  
        if (err) {  
            console.log(err);}  
        });  
        var result = [];
        request.on('row', function(columns) {  
            var obj = {};
            columns.forEach(function(column) {  
              if (column.value === null) {  
                  
              } else { 
                  console.log(column); 
                obj[column.metadata.colName] = column.value;  
              }  
            }); 
            result.push(obj); 
            console.log(result); 
        });  
  
        request.on('doneInProc', function(rowCount, more) {  
            console.log(rowCount + ' rows returned');
            callback(result);  
        });  
        connection.execSql(request);  
    }  
};

exports.findAllSolutionsForProblem = function(in_problemId, callback) {

    var connection = new Connection(config);  
    connection.on('connect', function(err) {  
        console.log("Connected");
        if (err) {  
            console.log(err);
        }  
        
        executeStatement();  
    }); 

    function executeStatement() {  
        request = new Request("SELECT * FROM Problem WHERE type = 'solution' and id = @in_problemId;", function(err) {  
        if (err) {  
            console.log(err);}  
        });  
        request.addParameter('in_problemId', TYPES.NVarChar,in_prolemId);  

        var result = [];
        request.on('row', function(columns) {  
            var obj = {};
            columns.forEach(function(column) {  
              if (column.value === null) {  
                  
              } else { 
                  console.log(column); 
                obj[column.metadata.colName] = column.value;  
              }  
            }); 
            result.push(obj); 
            console.log(result); 
        });  
  
        request.on('doneInProc', function(rowCount, more) {  
            console.log(rowCount + ' rows returned');
            callback(result);  
        });  
        connection.execSql(request);  
    }  
};

exports.updateComment = function (in_id, in_user, in_task, in_type, in_text, in_state, in_problem, callback) {
    var connection = new Connection(config); 
    var uid = guid(); 
    connection.on('connect', function(err) {  
        console.log("Connected");
        if (err) {  
            console.log(err);
        }  
        executeStatement(); 
    }); 


    function executeStatement() {  
        request = new Request(   "UPDATE Comment SET user = @in_user, task = @in_task, type = @in_type, text = @in_text, state = @in_state, problem = @in_problem WHERE id = @in_id;", function(err) {  
         if (err) {  
            console.log(err);}  
        });  
        request.addParameter('in_ID', TYPES.NVarChar,in_id);  
        request.addParameter('in_user', TYPES.NVarChar , in_user);  
        request.addParameter('in_task', TYPES.NVarChar, in_task); 
        request.addParameter('in_type', TYPES.NVarChar, in_type);  
        request.addParameter('in_text', TYPES.NVarChar, in_text);  
        request.addParameter('in_state', TYPES.NVarChar, in_state);  
        request.addParameter('in_problem', TYPES.NVarChar, in_problem);
        request.on('row', function(columns) {  
            columns.forEach(function(column) {  
              if (column.value === null) {  
                console.log('NULL');  
              } else {  
                console.log("Id of updated Comment is " + column.value);  
              }  
            });  
        });       
        request.on('doneInProc', function(rowCount, more) {  
            console.log(rowCount + ' rows returned');
            callback(in_id);  
        });  
        connection.execSql(request);  
    }  
};