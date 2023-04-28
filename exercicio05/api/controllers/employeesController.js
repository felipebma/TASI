const MOCK_DATA = require("../data/mock_data");
const Employee = require("../entities/Employee");
const uuid = require("uuid");

const BASE_URL = "localhost:8080";
const DEPARTMENTS_URL = `${BASE_URL}/departments`;
const EMPLOYEES_URL = `${BASE_URL}/employees`;
const employeesDB = {};
MOCK_DATA.employees.forEach((employee) => {
  employeesDB[employee.id] = employee;
});

const employeeLinks = (employee) => {
  return [
    {
      rel: "self",
      method: "GET",
      href: `${EMPLOYEES_URL}/${employee.id}`,
    },
    {
      rel: "edit",
      method: "PUT",
      title: "Edit employee",
      href: `${EMPLOYEES_URL}/${employee.id}`,
    },
    {
      rel: "delete",
      method: "DELETE",
      title: "Delete employee",
      href: `${EMPLOYEES_URL}/${employee.id}`,
    },
    {
      rel: "department",
      method: "GET",
      href: `${DEPARTMENTS_URL}/${employee.departmentId}`,
    },
  ];
};

const employeesListLinks = () => {
  return [
    {
      rel: "self",
      method: "GET",
      title: "Employees",
      href: `${EMPLOYEES_URL}`,
    },
    {
      rel: "create",
      method: "POST",
      title: "Create Employee",
      href: `${EMPLOYEES_URL}`,
    },
    { rel: "home", method: "GET", title: "back home", href: `${BASE_URL}` },
  ];
};

const controller = {
  getOne: (req, res) => {
    const employeeId = req.params.employeeId;
    if (employeeId in employeesDB) {
      const employee = employeesDB[employeeId];
      res.status(200).json({
        ...employee,
        links: employeeLinks(employee),
      });
    } else {
      res.status(404).send("There is no stored Employee with the requested id");
    }
  },
  listAll: (req, res) => {
    res.status(200).json({
      employees: Object.values(employeesDB).map((employee) => {
        return {
          ...employee,
          links: employeeLinks(employee),
        };
      }),
      links: employeesListLinks(),
    });
  },

  addEmployee: (req, res) => {
    if (req.body instanceof Employee) {
      let employee = req.body;
      employee.id = uuid.v4();
      employeesDB[employee.id] = employee;
      res.status(201).json({ ...employee, links: employeeLinks(employee) });
    } else {
      res.status(400).send("Invalid employee format");
    }
  },

  editEmployee: (req, res) => {
    let employeeId = req.params.employeeId;
    if (!(employeeId in employeesDB)) {
      res.status(404).send("There is no stored Employee with the requested id");
      return;
    }
    if (req.body instanceof Employee) {
      let employee = req.body;
      employee.id = employeeId;
      employeesDB[employeeId] = employee;
      res.json(employee);
    } else {
      res.status(400).send("Invalid employee format");
    }
  },

  deleteEmployee: (req, res) => {
    let employeeId = req.params.employeeId;
    if (!(employeeId in employeesDB)) {
      res.status(404).send("There is no stored Employee with the requested id");
      return;
    }
    delete employeesDB[employeeId];
    res.status(204).send();
  },
};

module.exports = controller;
