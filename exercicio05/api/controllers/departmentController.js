const MOCK_DATA = require("../data/mock_data");
const Department = require("../entities/Department");
const uuid = require("uuid");

const BASE_URL = "localhost:8080";
const DEPARTMENTS_URL = `${BASE_URL}/departments`;
const EMPLOYEES_URL = `${BASE_URL}/employees`;
const departmentsDB = {};
MOCK_DATA.departments.forEach((department) => {
  departmentsDB[department.id] = department;
});

const departmentLinks = (department) => {
  return [
    {
      rel: "self",
      method: "GET",
      href: `${DEPARTMENTS_URL}/${department.id}`,
    },
    {
      rel: "edit",
      method: "PUT",
      title: "Edit department",
      href: `${DEPARTMENTS_URL}/${department.id}`,
    },
    {
      rel: "delete",
      method: "DELETE",
      title: "Delete department",
      href: `${DEPARTMENTS_URL}/${department.id}`,
    },
    {
      rel: "departments",
      method: "GET",
      title: "Back to departments",
      href: `${DEPARTMENTS_URL}`,
    },
  ];
};

const departmentsListLinks = () => {
  return [
    {
      rel: "self",
      method: "GET",
      title: "Departments",
      href: `${DEPARTMENTS_URL}`,
    },
    {
      rel: "create",
      method: "POST",
      title: "Create Department",
      href: `${DEPARTMENTS_URL}`,
    },
    { rel: "home", method: "GET", title: "back home", href: `${BASE_URL}` },
  ];
};

const controller = {
  getOne: (req, res) => {
    const departmentId = req.params.departmentId;
    if (departmentId in departmentsDB) {
      const department = departmentsDB[departmentId];
      res.status(200).json({
        ...department,
        links: departmentLinks(department),
      });
    } else {
      res
        .status(404)
        .send("There is no stored Department with the requested id");
    }
  },
  listAll: (req, res) => {
    res.status(200).json({
      departments: Object.values(departmentsDB).map((department) => {
        return {
          ...department,
          links: departmentLinks(department),
        };
      }),
      links: departmentsListLinks(),
    });
  },

  addDepartment: (req, res) => {
    if (req.body instanceof Department) {
      let department = req.body;
      department.id = uuid.v4();
      departmentsDB[department.id] = department;
      res
        .status(201)
        .json({ ...department, links: departmentLinks(department) });
    } else {
      res.status(400).send("Invalid department format");
    }
  },

  editDepartment: (req, res) => {
    let departmentId = req.params.departmentId;
    if (!(departmentId in departmentsDB)) {
      res
        .status(404)
        .send("There is no stored Department with the requested id");
      return;
    }
    if (req.body instanceof Department) {
      let department = req.body;
      department.id = departmentId;
      departmentsDB[departmentId] = department;
      res.json(department);
    } else {
      res.status(400).send("Invalid department format");
    }
  },

  deleteDepartment: (req, res) => {
    let departmentId = req.params.departmentId;
    if (!(departmentId in departmentsDB)) {
      res
        .status(404)
        .send("There is no stored Department with the requested id");
      return;
    }
    delete departmentsDB[departmentId];
    res.status(204).send();
  },
};

module.exports = controller;
