// Dependencies
var mysql = require("mysql");
var inquirer = require("inquirer");
var cTable = require("console.table")

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3001,

    // Your username
    user: "root",

    // Your password
    password: "",
    database: "employees_db"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    // sqlAlter = "ALTER TABLE employees MODIFY COLUMN manager_id int FIRST";
    // run the start function after the connection is made to prompt the user
    start();
});

//////// START ////////
// Prompts the user for what action they should take
function start() {
    inquirer
        .prompt({
            name: "optionList",
            type: "list",
            message: "Would you like to do?",
            choices: ["VIEW", "ADD", "UPDATE", "DELETE", "MANAGER VIEW", "VIEW DEPARTMENT BUDGET", "EXIT"]
        })
        .then(function (answer) {
            // based on their answer, either call the bid or the post functions
            if (answer.optionList === "VIEW") {
                viewPrompt();
            }
            else if (answer.optionList === "ADD") {
                addPrompt();
            }
            else if (answer.optionList === "UPDATE") {
                updatePrompt();
            }
            else if (answer.optionList === "DELETE") {
                deletePrompt();
            }
            else if (answer.optionList === "MANAGER VIEW") {
                managerViewPrompt();
            }
            else if (answer.optionList === "VIEW DEPARTMENT BUDGET") {
                viewDepartmentBudget();
            } else {
                console.log("Program terminated");
                connection.end();
            }
        });
}

//////// VIEW ////////
// View departments, roles, employees 
function viewPrompt() {
    inquirer
        .prompt({
            name: "viewList",
            type: "list",
            message: "Would you like to view departments, roles or employees?",
            choices: ["DEPARTMENTS", "ROLES", "EMPLOYEES", "BACK"]
        })
        .then(function (answer) {
            // based on their answer view respective tables
            if (answer.viewList === "DEPARTMENTS") {
                viewDepartments();
            }
            else if (answer.viewList === "ROLES") {
                viewRoles();
            }
            else if (answer.viewList === "EMPLOYEES") {
                viewEmployees();
            }
            else {
                start();
            }
        });
}