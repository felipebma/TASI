const Employee = require("../entities/Employee");
const Department = require("../entities/Department");

const departments = [
  new Department("Design", [], "1"),
  new Department("Research", [], "2"),
  new Department("Development", [], "3"),
  new Department("UI/UX", [], "4"),
  new Department("Human Resources", [], "5"),
];

const employees = [
  new Employee("Felipe", 3500.0, "3", "1"),
  new Employee("Amie", 7500.0, "4", "2"),
  new Employee("Amal", 15000.0, "3", "3"),
];

employees.forEach((employee) => {
  departments
    .find((department) => department.id == employee.departmentId)
    .employees.push(employee);
});

module.exports = { departments, employees };
