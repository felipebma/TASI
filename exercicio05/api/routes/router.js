const express = require("express");

const router = express.Router();
const employeesController = require("../controllers/employeesController");

router.get("/employees", employeesController.listAll);
router.get("/employees/:employeeId", employeesController.getOne);
router.post("/employees", employeesController.addEmployee);
router.put("/employees/:employeeId", employeesController.editEmployee);
router.delete("/employees/:employeeId", employeesController.deleteEmployee);

module.exports = router;
