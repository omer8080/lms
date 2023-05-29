const db = require("../models");
const Employee = db.employees;
const Op = db.Sequelize.Op;
const moment = require("moment");

// Create and Save a new Employee
exports.create = (req, res) => {
  // Validate request
  if (!req.body.username) {
    res.status(400).json({
      message: "Username can not be empty!",
    });
    return;
  }

  if (!req.body.dob) {
    res.status(400).json({
      message: "DOB can not be empty!",
    });
    return;
  }

  if (!req.body.email) {
    res.status(400).json({
      message: "Email can not be empty!",
    });
    return;
  }

  if (!req.body.gender) {
    res.status(400).json({
      message: "Gender can not be empty!",
    });
    return;
  }

  if (!req.body.position) {
    res.status(400).json({
      message: "Position can not be empty!",
    });
    return;
  }

  if (!req.body.phoneNo) {
    res.status(400).json({
      message: "Phone Number can not be empty!",
    });
    return;
  }

  if (!req.body.role) {
    res.status(400).json({
      message: "Role can not be empty!",
    });
    return;
  }

  const userRole = req.user.role;
  if (userRole !== "HR") {
    res.status(401).json({
      message: "You are not allowed to create an Employee",
    });
    return;
  }

  // Create a Employee
  const employee = {
    username: req.body.username,
    dob: moment(req.body.dob, "DD/MM/YYYY").format(),
    email: req.body.email,
    position: req.body.position,
    gender: req.body.gender,
    phoneNo: req.body.phoneNo,
    role: req.body.role,
  };

  // Save User in the database
  Employee.create(employee)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json({
        message:
          err.message || "Some error occurred while creating the Employee.",
      });
    });
};

exports.findAll = (req, res) => {
  const userRole = req.user.role;
  if (userRole !== "HR") {
    res.status(401).json({
      message: "You are not allowed to view all Employees",
    });
    return;
  }

  Employee.findAll({
    include: ["workExperiences", "educationQualifications"],
  })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json({
        message:
          err.message || "Some error occurred while retrieving employees.",
      });
    });
};

exports.findById = (req, res) => {
  const id = req.params.id;
  const userRole = req.user.role;
  if (userRole !== "HR") {
    res.status(401).json({
      message: "You are not allowed to view this Employee",
    });
    return;
  }

  Employee.findByPk(id, {
    include: ["workExperiences", "educationQualifications"],
  })
    .then((data) => {
      if (data) {
        res.json(data);
      } else {
        res.status(404).json({
          message: `Cannot find Employee with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error retrieving Employee with id=" + id,
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;
  const userRole = req.user.role;
  if (userRole !== "HR") {
    res.status(401).json({
      message: "You are not allowed to update this Employee",
    });
    return;
  }
  const empObj = {
    username: req.body.username,
    dob: moment(req.body.dob, "DD/MM/YYYY", true).isValid()
      ? moment(req.body.dob, "DD/MM/YYYY").format()
      : req.body.dob,
    gender: req.body.gender,
    email: req.body.email,
    position: req.body.position,
    phoneNo: req.body.phoneNo,
    role: req.body.role,
  };
  Employee.update(empObj, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        Employee.findByPk(id)
          .then((data) => {
            if (data) {
              res.json(data);
            } else {
              res.status(404).json({
                message: `Cannot find Employee with id=${id}.`,
              });
            }
          })
          .catch((err) => {
            res.status(500).json({
              message: "Error retrieving Employee with id=" + id,
            });
          });
      } else {
        res.json({
          message: `Cannot update Employee with id=${id}. Maybe Employee was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: err,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;
  const userRole = req.user.role;
  if (userRole !== "HR") {
    res.status(401).json({
      message: "You are not allowed to delete this Employee",
    });
    return;
  }

  Employee.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.json({
          message: "Employee was deleted successfully!",
        });
      } else {
        res.json({
          message: `Cannot delete Employee with id=${id}. Maybe Employee was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Could not delete Employee with id=" + id,
      });
    });
};
