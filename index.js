const inquirer = require('inquirer');
const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'password123',
    database: 'employee_db',
});

db.connect(() =>{
    start();
})

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
            console.log(answers)
            db.query('INSERT INTO employee SET ?', {
                first_name: answers.employeeFirst,
                last_name: answers.employeeLast,
                role_id: answers.employeeRole,
                manager_id: answers.employeeManager
            }, ()=>{
                start();
            });
            
        })
}

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
                start();
            })
            
        });
}