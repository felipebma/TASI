const express = require('express')
const cors = require('cors')
const Department = require('./entities/Department')
const Employee = require('./entities/Employees')

const MOCK_DATA = require('./data/mock_data')

const app = express()

const departments = MOCK_DATA.departments
const employees = MOCK_DATA.employees

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.get('/employees', (req, res) => {
    console.log(Object.keys(new Employee()))
    res.json(employees)
})

app.post('/employees', (req, res) => {
    if (req.body instanceof Employee) {
        let employee = req.body;
        employee.id = employees.length;
        employees.push(employee);
        res.json(employee)
    }
    else {
        res.status(400).send("Invalid employee format")
    }
})

app.listen(8080)