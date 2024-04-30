const inquirer = require('inquirer');
const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    port: '3001',
    user: 'root',
    password: '',
    database: 'employee_db',
});

start();

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
            switch (answers.options) {
                case 'view all departments':
                    break;
                case 'view all roles':
                    break;
                case 'view all employees':
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
            });
        })
}

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
                message: 'Please enter the role ID of the newly added employee',
                name: 'employeeRole',
            },
            {
                type: 'input',
                message: 'Please enter the manager ID of the new employee',
                name: 'employeeManager',
            },
        ]).then((answers) => {
            db.query('INSERT INTO employee SET ?', {
                first_name: answers.employeeFirst,
                last_name: employeeLast,
                role_id: employeeRole,
                manager_id: employeeManager
            })
        })
}

function updateEmployeeRole() {
    inquirer
        .prompt([
            {
                type: 'list',
                message: 'Please select the employee whose role you would like to update:',
                choices: '',
                name: 'employeeList',
            },
            {
                type: 'input',
                message: 'Please enter the updated role below:',
                name: 'updatedEmployee',
            },
            {
                type: 'input',
                message: 'Please enter the name of the role',
                name: 'roleName',
            },
            {
                type: 'input',
                message: 'Please enter the salary of the role',
                name: 'roleSalary',
            },
            {
                type: 'input',
                message: 'Please enter the department ID of the role',
                name: 'roleDept',
            },
        ]).then((answers) => {
            db.query("UPDATE employee SET ?", {
                title: answers.roleName,
                salary: answers.roleSalary,
                department_id: roleDept
            })
        })
}