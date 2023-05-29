const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerSpecs = require("./swagger"); // Adjust the path to your Swagger configuration file

const cors = require("cors");
require("dotenv").config();

const app = express();

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

app.use(express.static("public"));

var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());
global.__basedir = __dirname;
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

//index.js
app.get("/", (req, res) => {
  res.sendFile("index.html", { root: path.join(__dirname, "public") });
});

const db = require("./app/models");
db.sequelize
  .sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

require("./app/routes/turorial.route.js")(app);
require("./app/routes/login.route.js")(app);
require("./app/routes/employee.route.js")(app);
require("./app/routes/workExperience.route.js")(app);
require("./app/routes/educationQualification.route.js")(app);
require("./app/routes/attachment.route.js")(app);
require("./app/routes/leave.route.js")(app);

// set port, listen for requests
const PORT = process.env.DB_PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
