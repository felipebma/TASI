module.exports = class Department {
    constructor(name, employees = [], id) {
        this.id = id
        this.name = name
        this.employees = employees
    }

    static [Symbol.hasInstance](obj) {
        return Object.keys(new Department()).every((key) => key === "id" || obj[key])
    }
}