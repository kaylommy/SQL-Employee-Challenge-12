const inquirer = require('inquirer');
const mysql = require('mysql2');
// creates connection from db to mysql
const db = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'password123',
    database: 'employee_db',
});
// on connect runs the start function
db.connect(() =>{
    start();
})
// starting menu
function start() {
    inquirer
        .prompt([
            {
                type: 'list',
                message: 'Please select an option below:',
                choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add an employee', 'update an employee role'],
                name: 'options',
            }
        ]).then((answers) => {
            // runs function based on answer
            switch (answers.options) {
                case 'view all departments':
                    viewDepartments();
                    break;
                case 'view all roles':
                    viewRoles();
                    break;
                case 'view all employees':
                    viewEmployees();
                    break;
                case 'add a department':
                    addDepartmentName();
                    break;
                case 'add an employee':
                    addEmployee();
                    break;
                case 'update an employee role':
                    updateEmployeeRole();
                    break;
            }
        })
}
// view all departments
function viewDepartments(){
    db.query(`SELECT * FROM department`, (err, result) =>{
        if(err){
            console.error('there was an error getting all departments.')
        }else{
            console.table(result);
        }
        start();
    })
}
// view all roles
function viewRoles(){
    db.query(`SELECT * FROM role`, (err, result) => {
        if(err){
            console.error('there was an error getting all roles.')
        }else{
            console.table(result);
        }
        start();
    })
}
// view all employees
function viewEmployees(){
    db.query(`SELECT * FROM employee`, (err, result) => {
        if(err){
            console.error('there was an error getting all employees.')
        }else{
            console.table(result);
        }
        start();
    })
}
// add a department
function addDepartmentName() {
    inquirer
        .prompt([
            {
                type: 'input',
                message: 'What is the name of the department you want to add?',
                name: 'departmentName',
            }
        ]).then((answers) => {
            db.query("INSERT INTO department SET ?", {
                department_name: answers.departmentName
            }, (err, results) => {
                if (err) {
                    console.error('There was an error with adding the department name.', err);
                } else {
                    console.log('Department added successfully!');
                }
                start();
            });
       
        })
}
// add an employee
function addEmployee() {
    inquirer
        .prompt([
            {
                type: 'input',
                message: 'Please enter the first name of the employee you would like to add',
                name: 'employeeFirst',
            },
            {
                type: 'input',
                message: 'Please enter the last name of the employee you would like to add',
                name: 'employeeLast',
            },
            {
                type: 'input',
                message: 'Please enter the role of the newly added employee',
                name: 'employeeRole',
            },
            {
                type: 'input',
                message: 'Please enter the manager of the new employee',
                name: 'employeeManager',
            },
        ]).then((answers) => {
            db.query('INSERT INTO employee SET ?', {
                first_name: answers.employeeFirst,
                last_name: answers.employeeLast,
                role_id: answers.employeeRole,
                manager_id: answers.employeeManager
            }, ()=>{
                console.log('employee added sucessfully!');
                start();
            });
        })
}
// update an employee role
function updateEmployeeRole() {
    inquirer
        .prompt([
            {
                type: 'input',
                message: 'Please input the employees id that would like to update',
                name: 'employeeId',
            },
            {
                type: 'input',
                message: 'Please enter the updated role below:',
                name: 'roleId',
            },
        ]).then((answers) => {
            db.query("UPDATE employee SET role_id = ? WHERE id = ?", [
                answers.roleId,
                answers.employeeId,
            ], ()=>{
                console.log('updated successfully!');
                start();
            })
        });
}