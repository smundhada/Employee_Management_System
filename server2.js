var mysql = require("mysql");
var inquirer = require("inquirer");
let currentEmp = [];
let currentRole = [];
let currentDept = [];
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Shubhi@342",
  database: "employee_management_sys_db"
});

connection.connect(function(err) {
    if (err) throw err;
    init();
});

function init(){
    
    inquirer
    .prompt({
      name: "program",
      type: "list",
      message: "Hello There, What changes would you like to implement to the Employee Management?",
      choices: [
        "Add a New Department",
        "Add a New Role",
        "Add a New Employee",
        "View all Departments",
        "View all Roles",
        "View all Employees",
        "Update Employee's Role", 
        "Update Employee's Manager",
        "Delete a Department",
        "Delete a Role",
        "Delete a Employee",
        "View the total utilized budget by department"
      ]
    })
    .then(function(answer) {
        switch (answer.program) {
        case "Add a New Department" :
                console.log("dept")
        case "Add a New Role":
                console.log("role")
        case "Add a New Employee" :
                console.log("emp")
      // case "View all Departments":
      //       allDepartment();
      // case "View all Roles":
      //       allRoles();
      // case "View all Employees":
      //       allEmployee();
    //   case "Update Employee's Role": 
    //   case "Update Employee's Manager":
    //   case "Delete a Department":
    //   case "Delete a Role":
    //   case "Delete a Employee":
    //   case "View the total utilized budget by department":
        }
    });

}
