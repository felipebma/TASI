const MOCK_DATA = require("../data/mock_data");
const uuid = require("uuid");

const departmentDB = {};
MOCK_DATA.department.forEach((department) => {
  departmentDB[department.id] = department;
});

function listAll(req, res) {
  res.status(200).json(Object.values(departmentDB));
}

function addDepartment(req, res) {
  if (req.body instanceof department) {
    let department = req.body;
    department.id = uuid.v4();
    departmentDB[department.id] = department;
    res.json(department);
  } else {
    res.status(400).send("Invalid department format");
  }
}

function editDepartment(req, res) {
  const departmentId = parseInt(req.params.departmentId);
  console.log(departmentId);
}

function deletedepartment(req, res) {
  const departmentId = parseInt(req.params.departmentId);
  console.log(departmentId);
}

const controller = { listAll, addDepartment, editDepartment, deletedepartment };

module.exports = controller;
