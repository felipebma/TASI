const Employee = require('../entities/Employees')
const Department = require('../entities/Department')

const departments = [
    new Department("Design"),
    new Department("Research"),
    new Department("Development"),
    new Department("UI/UX"),
    new Department("Human Resources")
]

const employees = [
    new Employee("Felipe", 3500.00, 2),
    new Employee("Amie", 7500.00, 4),
    new Employee("Amal", 15000.00, 2)
]

employees.forEach(employee => {
    departments[employee.departmentId].employees.push(employee);
})

module.exports = { departments, employees }