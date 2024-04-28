const inquirer = require('inquirer');
const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    port: '3001',
    user: 'root',
    password: '',
    database: 'employee_db',
})

function departmentInfo(){
    inquirer
    .prompt([
        {
            type: 'input',
            message: 'What is the name of the department you want to add?',
            name: 'departmentName',
        }
    ]).then((answers) =>{
        db.query("INSERT INTO department SET ?", {
            department_name: answers.departmentName
        })
    })
}

// {
//     type: 'list',
//     message: 'Please select an option below:',
//     choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add an employee', 'update an employee role'],
//     name: 'options',
// },
// {
//     type: 'input',
//     message: 'Please enter the name of the role',
//     name: 'roleName',
// },
// {
//     type: 'input',
//     message: 'Please enter the salary of the role',
//     name: 'roleSalary',
// },
// {
//     type: 'input',
//     message: 'Please enter the department of the role',
//     name: 'roleDept',
// },
// {
//     type: 'input',
//     message: 'Please enter the first name of the employee you would like to add',
//     name: 'employeeFirst',
// },
// {
//     type: 'input',
//     message: 'Please enter the last name of the employee you would like to add',
//     name: 'employeeLast',
// },
// {
//     type: 'input',
//     message: 'Please enter the role of the newly added employee',
//     name: 'employeeRole',
// },
// {
//     type: 'input',
//     message: 'Please enter the manager of the new employee',
//     name: 'employeeManager',
// },
// {
//     type: 'list',
//     message: 'Please select the employee whose role you would like to update:',
//     choices: '',
//     name: 'employeeList',
// },
// {
//     type: 'input',
//     message: 'Please enter the updated role below:',
//     name: 'updatedEmployee',
// },

