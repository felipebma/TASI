const express = require("express");

const router = express.Router();
const employeesController = require("../controllers/employeesController");
const departmentController = require("../controllers/departmentController");

router.get("/employees", employeesController.listAll);
router.get("/employees/:employeeId", employeesController.getOne);
router.post("/employees", employeesController.addEmployee);
router.put("/employees/:employeeId", employeesController.editEmployee);
router.delete("/employees/:employeeId", employeesController.deleteEmployee);

router.get("/departments", departmentController.listAll);
router.get("/departments/:departmentId", departmentController.getOne);
router.post("/departments", departmentController.addDepartment);
router.put("/departments/:departmentId", departmentController.editDepartment);
router.delete(
  "/departments/:departmentId",
  departmentController.deleteDepartment
);

module.exports = router;
