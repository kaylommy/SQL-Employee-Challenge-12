USE employee_db;

-- department table
INSERT INTO department (department_name)
VALUES("Human Resources");
INSERT INTO department(department_name)
VALUES("Marketing");
INSERT INTO department (department_name)
VALUES("Finance");
INSERT INTO department (department_name)
VALUES("Customer Service");

-- role table
INSERT INTO role (title, salary, department_id)
VALUES ("Human Resources Specialist", 74624, 1);
INSERT INTO role (title, salary, department_id)
VALUES ("Chief Marketing Officer", 350000, 2);
INSERT INTO role (title, salary, department_id)
VALUES ("Accountant", 100000, 3);
INSERT INTO role (title, salary, department_id)
VALUES ("Customer Service Rep", 40000, 4);

-- employee table
INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Ryan", "Atwood", 1);
INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Seth", "Cohen", 2);
INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Summer", "Roberts", 3);
INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Marissa", "Cooper", 4);
INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Taylor", "Townsend", 1);
INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Brooke", "Davis", 2);

UPDATE employee SET manager_id = 2 WHERE id = 1;
UPDATE employee SET manager_id = 3 WHERE id = 4;