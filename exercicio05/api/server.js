const express = require("express");
const cors = require("cors");

const routes = require("./routes/router");

var hateoasLinker = require("express-hateoas-links");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(hateoasLinker);
const router = express.Router();

// app.route("/employees").get(employeesController.listAll);

app.use("/", routes);

app.listen(8080);
