const mysql = require("mysql");
const inquirer = require("inquirer");
const consoleTable = require("console.table");

// create the connection information for the sql database
const connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "admin",
  database: "employee_tablesDB"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  start();
});

// function which prompts the user for what action they should take
function start() {
  inquirer
    .prompt({
      name: "employee",
      type: "list",
      message: "What would you like to do?",
      choices: ["Add Department", "Add Roles", "Add Employee", "View Departments", "View Roles", "View Employee", "Update Employee Roles", "Quit"]
    })
    .then(function (answer) {
      switch (answer.employee) {
        case "Add Department":
          addDepartment()
          break
        case "Add Roles":
          addRoles()
          break
        case "Add Employee":
          addEmployee()
          break
        case "View Departments":
          viewDepartments()
          break
        case "View Roles":
          viewRoles()
          break
        case "View Employee":
          viewEmployee()
          break
        case "Update Employee Roles":
          updateEmployee()
          break
        case "Quit":
          process.exit()




      }




    });
}

function viewEmployee() {
  const query = "SELECT first_name, last_name FROM employee";
  connection.query(query, function (err, res) {
    console.table(res)
    start();
  });
}

function viewRoles() {
  const query = "SELECT title, salary, department_id FROM role";
  connection.query(query, function (err, res) {
    console.table(res)
    start();
  });
}

function viewDepartments() {
  const query = "SELECT name FROM department";
  connection.query(query, function (err, res) {
    console.table(res)
    start();
  });
}


function addRoles() {
  inquirer
    .prompt(
      {

        type: "input",
        message: "Enter the department name?",
        name: "name"
      }
    )
    .then(function (selection) {
      console.log(selection.name)

      // when finished prompting, insert a new item into the db with that info
      connection.query(
        "INSERT INTO department SET ?",
        {
          name: selection.name,

        },
        function (err, res) {
          if (err) throw err;
          console.log("success");

          start();
        }
      );
    })

}

function addDepartment() {
  inquirer
    .prompt(
      {

        type: "input",
        message: "Enter the department name?",
        name: "name"
      }
    )
    .then(function (selection) {
      console.log(selection.name)

      // when finished prompting, insert a new item into the db with that info
      connection.query(
        "INSERT INTO department SET ?",
        {
          name: selection.name,

        },
        function (err, res) {
          if (err) throw err;
          console.log("success");

          start();
        }
      );
    })

}

function addEmployee() {
  inquirer
    .prompt([
      {

        type: "input",
        message: "Enter employee first name",
        name: "first_name"
      },
      {
        type: "input",
        message: "Enter employee last name",
        name: "last_name"
      }

    ])
    .then(function (selection) {
      console.log(selection.first+ " " + selection.last)

      // when finished prompting, insert a new item into the db with that info
      const query = connection.query(
        "INSERT INTO employee SET ?",
        {
          first: selection.first_name,
          last: selection.last_name

        },
        function (err, res) {
          if (err) throw err;
          console.log("success");

          start();
        }
      );
    })

}



function LookupRoles() {
  return new Promise(function (resolve, reject) {

  var statement=  connection.query(
      "SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id"

      , function (err, data) {
        // console.log(data)
        resolve(data)
      });
    console.log(statement.sql)
  })
}

function updateEmployee() {
  LookupRoles().then(function (data) {
    console.log(data)
    let roles = data.map(data => data.id +" " +data.department+" "+ data.title+" "+data.salary)
    inquirer
      .prompt(
        {
          type: "list",
          message: "What is the new employee role?",
          choices: roles,
          name: "roleId"
        }
      ).then(function (data) {
       var id = data.roleId.split(" ")
       var getId=id[0]
        inquirer.prompt([
          {
            type: "input",
            message: "What is the new title?",
            name: "updateRole"
          }
        ]).then(function (input){
          connection.query("update role SET title=? WHERE id=?",[input.updateRole,getId],function(er,data){

            start()
          })
        })

      })
  })


}
