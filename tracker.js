const mysql = require("mysql");
const inquirer = require("inquirer");

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
connection.connect(function(err) {
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
      choices: ["Add Deparments", "Add Roles", "Add employee", "View Departments", "View Roles", "View Employee", "Update Employee Roles"]
    })
    .then(function(answer) {
      switch(answer.employee) {
          
      }
      
      
      
     
    });
}