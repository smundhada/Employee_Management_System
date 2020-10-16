var mysql = require("mysql");
var inquirer = require("inquirer");
let currentEmp = [];
let currentRole = [];
let currentDept = [];
let listEmp = [];
let listRole = []; 
let listDept = []; 
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
    update();
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
        "View Certain Manager's Team",
        "Delete a Department",
        "Delete a Role",
        "Delete a Employee",
        "View the total utilized budget by department"
      ]
    })
    .then(function(answer) {
      switch (answer.program) {

      case "Add a New Department":
            addDepartment();
            break;

      case "Add a New Role":
            addRole();
            break;

      case "Add a New Employee":
            addEmployee();
            break;

      case "View all Departments":
            allDepartment();
            break;

      case "View all Roles":
            allRoles();
            break;

      case "View all Employees":
            allEmployee();
            break;
            
      case "Update Employee's Role": 
            updateRole();
            break;
      
      case "Update Employee's Manager":
            updateManager();
            break;
      
      case "View Certain Manager's Team":
            managerTeam();
            break;
      case "Delete a Department": 
            delDept();
            break;
      case "Delete a Role":
            delRole();
            break;
      case "Delete a Employee":
            delEmp();
            break;
      case "View the total utilized budget by department":
            budget();
            break;

      }
    });

}

function update(){
     currentEmp = [];
     currentRole = [];
     currentDept = [];
     listEmp = [];
     listRole = []; 

    connection.query("SELECT * FROM employee", function(err, results) {
        if (err) throw err;
        results.forEach(element => currentEmp.push(element));
        listEmp.push("No Manager");
        currentEmp.forEach(element => listEmp.push(element.first_name + ' ' + element.last_name));
      
    });
    connection.query("SELECT * FROM role", function(err, results) {
        if (err) throw err;
        results.forEach(element => currentRole.push(element));
        listRole.push("No Role");
        currentRole.forEach(element => listRole.push(element.title));
    
    });
    connection.query("SELECT * FROM department", function(err, results) {
        if (err) throw err;
        results.forEach(element => currentDept.push(element));
        listDept.push("No Dept");
        currentDept.forEach(element => listDept.push(element.name));
    });

}

function addDepartment(){
    inquirer
    .prompt({
      name: "newDepartment",
      type: "input",
      message: "What is the new department name?",
    })
    .then(function(answer) {
        connection.query(
            "INSERT INTO department SET ?",
            {
                name: answer.newDepartment
            },
            function(err) {
              if (err) throw err;
              console.log("The new department is successfully inputed!");
              init();
            }
          );
    });
}

function addRole(){
    inquirer
    .prompt([
      {
        name: "title",
        type: "input",
        message: "What is the title of New Role?",
      },{
        name: "salary",
        type: "input",
        message: "What is the salary of New Role?",
      },{
        name: "department",
        type: "input",
        message: "What is the department id of New Role?",
      }
    ])
    .then(function(answer) {
        connection.query(
            "INSERT INTO role SET ?",
            {
                title: answer.title,
                salary: answer.salary,
                department_id: answer.department
            },
            function(err) {
              if (err) throw err;
              console.log("The new role is successfully inputed!");
              init();
            }
          );
    });
}

function addEmployee(){

    inquirer
    .prompt([
      {
        name: "firstName",
        type: "input",
        message: "What is the first name of new employee?",
      },{
        name: "lastName",
        type: "input",
        message: "What is the last name of new employee?",
      },{
        name: "role",
        type: "list",
        message: "What is the role of new employee?",
        choices : listRole
      },{
        name: "manager",
        type: "list",
        message: "Whose is the manager of new employee?",
        choices : listEmp
      }
    ])
    .then(function(answer) {
        connection.query(
            "INSERT INTO employee SET ?",
            {
                first_name: answer.firstName,
                last_name: answer.lastName,
                role_id: listRole.indexOf(answer.role),
                manager_id: listEmp.indexOf(answer.manager)
            },
            function(err) {
              if (err) throw err;
              console.log("The new role is successfully inputed!");
              init();
            }
        );
    });



}

function allDepartment(){
    console.log("hey");
    console.table(currentDept);
    init();
}

function allRoles(){
    console.clear();
    console.table(currentRole);
    init();
}

function allEmployee(){
    console.clear();
    console.table(currentEmp);
    init();
}

function updateRole(){

  inquirer
  .prompt([
    {
      name: "updateEmpName",
      type: "list",
      message: "Which employee's role would you like to update?",
      choices : listEmp
    },{
      name: "newRole",
      type: "list",
      message: "What is the new role for this employee?",
      choices : listRole
    }
  ])
  .then(function(answer) {
    let resultEmp = currentEmp.find(obj => {
      return obj.first_name === answer.updateEmpName.split(' ')[0]
    })

    let resultRole = currentRole.find(obj => {
      return obj.title === answer.newRole
    })


      connection.query(
        "UPDATE employee SET ? WHERE ?",
            [
              {
                role_id: resultRole.id,
              },
              {
                id: resultEmp.id,
              }
            ],
          function(err) {
            if (err) throw err;
            console.log("The new role is successfully inputed!");
            init();
          }
      );
  });

}

function updateManager(){

  inquirer
  .prompt([
    {
      name: "updateEmpName",
      type: "list",
      message: "Which employee's manager would you like to update?",
      choices : listEmp
    },{
      name: "newManager",
      type: "list",
      message: "Who is the new manager for this employee?",
      choices : listEmp
    }
  ])
  .then(function(answer) {
    let resultMan = currentEmp.find(obj => {
      return obj.first_name === answer.newManager.split(' ')[0]
    })
    let resultEmp = currentEmp.find(obj => {
      return obj.first_name === answer.updateEmpName.split(' ')[0]
    })

      connection.query(
        "UPDATE employee SET ? WHERE ?",
            [
              {
                manager_id: resultMan.id,
              },
              {
                id: resultEmp.id,
              }
            ],
          function(err) {
            if (err) throw err;
            console.log("The new manager is successfully inputed!");
            init();
          }
      );
  });

}

function managerTeam(){

  inquirer
  .prompt([
    {
      name: "managerEmpName",
      type: "list",
      message: "Which manager's team would you like to view?",
      choices : listEmp
    }
  ])
  .then(function(answer) {
    let result = currentEmp.find(obj => {
      return obj.first_name === answer.managerEmpName.split(' ')[0]
    })
    console.log(result);
      connection.query(
          "SELECT * FROM employee WHERE ?",
            [
              {
                manager_id: result.id,
              }
            ],
          function(err, results) {
            if (err) throw err;
            console.table(results);
            init();
          }
      );
  });

}

function delDept(){
  inquirer
  .prompt([
    {
      name: "dept",
      type: "list",
      message: "Which department would you like to delete?",
      choices : listDept
    }
  ])
  .then(function(answer) {
    let result = currentDept.find(obj => {
        return obj.name === answer.dept
    })
      connection.query(
          "DELETE FROM department WHERE ?",
            [
              {
                id: result.id,
              }
            ],
          function(err) {
            if (err) throw err;
            console.log("Sucessfully deleted the department.");
            init();
          }
      );
  });

}

function delRole(){
  inquirer
  .prompt([
    {
      name: "role",
      type: "list",
      message: "Which role would you like to delete?",
      choices : listRole
    }
  ])
  .then(function(answer) {
    let result = currentRole.find(obj => {
        return obj.title === answer.role
    })
    console.log(result);
      connection.query(
          "DELETE FROM role WHERE ?",
            [
              {
                id: result.id,
              }
            ],
          function(err) {
            if (err) throw err;
            console.log("Sucessfully deleted the role.");
            init();
          }
      );
  });

}

function delEmp(){
  inquirer
  .prompt([
    {
      name: "emp",
      type: "list",
      message: "Which employee would you like to delete?",
      choices : listEmp
    }
  ])
  .then(function(answer) {
    let resultEmp = currentEmp.find(obj => {
      return obj.first_name === answer.emp.split(' ')[0]
    })
    console.log(resultEmp);
    let sql2 = `DELETE FROM employee WHERE id = "${resultEmp.id}" ;`;
      connection.query( sql2,
          function(err) {
            if (err) throw err;
            console.log("Sucessfully deleted the employee.");
            init();
          }
      );
  });

}

function budget(){
  inquirer
  .prompt([
    {
      name: "Dept",
      type: "list",
      message: "Which department would you like to view budget for?",
      choices : listDept
    }
  ])
  .then(function(answer) {
    let resultDept = currentDept.find(obj => {
      return obj.name === answer.Dept
    })
  console.log(resultDept);
      let sql2 = `select sum(salary) as budget from department a left outer join role b on a.id = b.department_id where a.id = "${resultDept.id}" ;`;

      connection.query(sql2, function(err, results) {
            if (err) throw err;
            console.log(results);
            let budgetValue = results;
            console.log("The " +  resultDept.name + " Department consumes $" + results[0].budget + " of the budget!");
            init();
          }
      );
  });
}