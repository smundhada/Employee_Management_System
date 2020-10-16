USE employee_management_sys_db;

INSERT INTO department (name) VALUES ("Executive");
INSERT INTO department (name) VALUES ("Finance");
INSERT INTO department (name) VALUES ("Sales");
INSERT INTO department (name) VALUES ("Purchasing");

INSERT INTO role (title, salary, department_id) VALUES ("CEO", 1000000, 1);
INSERT INTO role (title, salary, department_id) VALUES ("COO", 700000, 1);

INSERT INTO role (title, salary, department_id) VALUES ("CFO", 600000, 2);
INSERT INTO role (title, salary, department_id) VALUES ("Accountant", 60000, 2);

INSERT INTO role (title, salary, department_id) VALUES ("Manager", 200000, 3);
INSERT INTO role (title, salary, department_id) VALUES ("Representive", 45000, 3);

INSERT INTO role (title, salary, department_id) VALUES ("Manager", 200000, 4);
INSERT INTO role (title, salary, department_id) VALUES ("RecordKeeper", 15000, 4);

INSERT INTO employee (role_id, first_name, last_name) VALUES (1, "Jimon", "Diamond");
INSERT INTO employee (role_id, first_name, last_name) VALUES (1, "Ben", "Jackson");
INSERT INTO employee (role_id, first_name, last_name) VALUES (2, "Kush", "Maheshwari");
INSERT INTO employee (role_id, first_name, last_name) VALUES (2, "Peter", "Koo");
INSERT INTO employee (role_id, first_name, last_name) VALUES (3, "Rusell", "Will");
INSERT INTO employee (role_id, first_name, last_name) VALUES (3, "Matt", "Bike");
INSERT INTO employee (role_id, first_name, last_name) VALUES (4, "Sam", "Husky");
INSERT INTO employee (role_id, first_name, last_name) VALUES (4, "Tanya", "Singh");