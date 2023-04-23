module.exports = class Employee {
    constructor(name, salary, departmentId, id) {
        this.id = id
        this.name = name
        this.salary = salary
        this.departmentId = departmentId
    }

    static [Symbol.hasInstance](obj) {
        return Object.keys(new Employee()).every((key) => key === "id" || obj[key])
    }
}