DROP DATABASE IF EXISTS employee_management_sys_db;
-- Create a database called programming_db --
CREATE DATABASE employee_management_sys_db;
USE employee_management_sys_db;

CREATE TABLE department (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(30)
);
CREATE TABLE role (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT,
    INDEX (department_id),
    FOREIGN KEY (department_id) REFERENCES department(id) 
);
CREATE TABLE employee (
    id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT NULL,
    INDEX (role_id),
    FOREIGN KEY (role_id) REFERENCES role(id)
);


