DROP DATABASE IF EXISTS employee_tablesDB;
CREATE database employee_tablesDB;

USE employee_tablesDB;

CREATE TABLE department (
  id INT NOT NULL auto_increment,
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO department (name)
VALUES ("sales");

CREATE TABLE role (
  id INT NOT NULL auto_increment,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(10,2) NOT NULL,
  department_id INT(10) NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO role (title, salary, department_id)
VALUES ("ceo", 150000.00, 1), ("IT Assistant", 50000.00, 2);

CREATE TABLE employee (
    id INT NOT NULL auto_increment,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT(10) NOT NULL,
    manager_id INT(10) NULL,
    PRIMARY KEY (id)
);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Michael", "Scott", 9, 7), ("Dwight", "Schrute", 3, 5);
