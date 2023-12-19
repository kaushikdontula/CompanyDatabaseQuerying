module.exports = function(){
  var express = require('express');
  var router = express.Router();
  console.log('Employee Page accessed');

  function getProjects(res, mysql, context, complete){
    console.log("HELLOOOOOOO");
    mysql.pool.query("SELECT DISTINCT PROJECT.Pnumber as id, PROJECT.Pname FROM PROJECT;", function(error, results, fields){
        if(error){
            res.write(JSON.stringify(error));
            res.end();
        }
        console.log(results);
        context.projects  = results;
        complete();
    });
  }

    /*Display all people. Requires web based javascript to delete users with AJAX*/

    function getEmployees(res, mysql, context, complete){
      mysql.pool.query("SELECT fname, lname, Salary, Dno FROM EMPLOYEE", function(error, results, fields){
          if(error){
              res.write(JSON.stringify(error));
              res.end();
          }
          context.people = results;
          complete();
      });
    }

  function getEmployeebyProject(req, res, mysql, context, complete){
    // var query = "SELECT bsg_people.character_id as id, fname, lname, bsg_planets.name AS homeworld, age FROM bsg_people INNER JOIN bsg_planets ON homeworld = bsg_planets.planet_id WHERE bsg_people.homeworld = ?";
    var query = "SELECT WORKS_ON.Pno, EMPLOYEE.Fname, EMPLOYEE.Lname FROM EMPLOYEE, WORKS_ON WHERE Essn = Ssn AND Pno = ?"
    console.log(req.params)
    var inserts = [req.params.project]
    mysql.pool.query(query, inserts, function(error, results, fields){
          if(error){
              res.write(JSON.stringify(error));
              res.end();
          }
          context.people = results;
          complete();
      });
  }

  /* Find people whose fname starts with a given string in the req */
  function getPeopleWithNameLike(req, res, mysql, context, complete) {
    //sanitize the input as well as include the % character
    var query = "SELECT fname, lname, Salary, Dno FROM EMPLOYEE WHERE EMPLOYEE.fname LIKE " + mysql.pool.escape(req.params.s + '%');
    console.log(query)

    mysql.pool.query(query, function(error, results, fields){
          if(error){
              res.write(JSON.stringify(error));
              res.end();
          }
          context.people = results;
          complete();
      });
  }

      /*Display all people from a given project. Requires web based javascript to delete users with AJAX*/
      router.get('/filter/:project', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["filterEmployee.js","searchemployee.js"];
        console.log("HELLOOO");
        var mysql = req.app.get('mysql');
        getEmployeebyProject(req,res, mysql, context, complete);
        console.log("HELLOOO1111");
        getProjects(res, mysql, context, complete);
        console.log("HELLOOO222222");
        function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                res.render('employee', context);
            }

        }
    });

    /*Display all people whose name starts with a given string. Requires web based javascript to delete users with AJAX */
    router.get('/search/:s', function(req, res){
      var callbackCount = 0;
      var context = {};
      context.jsscripts = ["searchemployee.js", "filterEmployee.js"];
      var mysql = req.app.get('mysql');
      getPeopleWithNameLike(req, res, mysql, context, complete);
      getProjects(res, mysql, context, complete);
      function complete(){

      callbackCount++;
        if(callbackCount >= 2){
          res.render('employee', context);
        }
      }
      

    });

  router.get('/', function(req, res){
      var callbackCount = 0;
      var context = {};
      context.jsscripts = ["searchemployee.js"];
      var mysql = req.app.get('mysql');
      getEmployees(res, mysql, context, complete);
      getProjects(res, mysql, context, complete);
      function complete(){
          callbackCount++;
          if(callbackCount >= 2){
              res.render('employee', context);
          }

      }
  });

  router.get('/reset', function(req, res){
    res.redirect('/employee');
  });

  return router;
}();

