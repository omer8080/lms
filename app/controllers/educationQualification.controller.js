const db = require("../models");
const EducationQualification = db.educationQualifications;
const Op = db.Sequelize.Op;
const moment = require("moment");

// Create and Save a new Work Experience
exports.create = (req, res) => {
  // Validate request
  if (!req.body.course) {
    res.status(400).json({
      message: "Course can not be empty!",
    });
    return;
  }

  if (!req.body.institute) {
    res.status(400).json({
      message: "Institute can not be empty!",
    });
    return;
  }

  if (!req.body.passDate) {
    res.status(400).json({
      message: "Pass Date can not be empty!",
    });
    return;
  }

  if (!req.body.employeeId) {
    res.status(400).json({
      message: "Employee ID is missing",
    });
    return;
  }

  const userRole = req.user.role;
  if (userRole !== "HR") {
    res.status(401).json({
      message: "You are not allowed to create Education Qualification",
    });
    return;
  }

  // Create a Work Experience
  const educationQualification = {
    course: req.body.course,
    institute: req.body.institute,
    employeeId: req.body.employeeId,
    passDate: moment(req.body.passDate, "DD/MM/YYYY").format(),
  };

  // Save EducationQualification in the database
  EducationQualification.create(educationQualification)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json({
        message:
          err.message ||
          "Some error occurred while creating the Work Experience.",
      });
    });
};

exports.findAllByEmployeeId = (req, res) => {
  const employeeId = req.params.employeeId;

  const userRole = req.user.role;
  if (userRole !== "HR") {
    res.status(401).json({
      message: "You are not allowed to get all Education Qualification",
    });
    return;
  }

  EducationQualification.findAll({
    where: {
      employeeId: employeeId,
    },
  })
    .then((data) => {
      if (data) {
        res.json(data);
      } else {
        res.status(404).json({
          message: `Cannot find EducationQualification for Employee id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message:
          "Error retrieving EducationQualification for Employee with id=" + id,
      });
    });
};

exports.findById = (req, res) => {
  const id = req.params.id;

  const userRole = req.user.role;
  if (userRole !== "HR") {
    res.status(401).json({
      message: "You are not allowed to get Education Qualification",
    });
    return;
  }

  EducationQualification.findByPk(id)
    .then((data) => {
      if (data) {
        res.json(data);
      } else {
        res.status(404).json({
          message: `Cannot find EducationQualification with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error retrieving EducationQualification with id=" + id,
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  const userRole = req.user.role;
  if (userRole !== "HR") {
    res.status(401).json({
      message: "You are not allowed to update Education Qualification",
    });
    return;
  }

  const educationQualification = {
    course: req.body.course,
    institute: req.body.institute,
    employeeId: req.body.employeeId,
    passDate: moment(req.body.passDate, "DD/MM/YYYY", true).isValid()
      ? moment(req.body.passDate, "DD/MM/YYYY").format()
      : req.body.passDate,
  };

  EducationQualification.update(educationQualification, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        EducationQualification.findByPk(id)
          .then((data) => {
            if (data) {
              res.json(data);
            } else {
              res.status(404).json({
                message: `Cannot find EducationQualification with id=${id}.`,
              });
            }
          })
          .catch((err) => {
            res.status(500).json({
              message: "Error retrieving EducationQualification with id=" + id,
            });
          });
      } else {
        res.json({
          message: `Cannot update EducationQualification with id=${id}. Maybe EducationQualification was not found or req.body is empty!`,
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
      message: "You are not allowed to delete Education Qualification",
    });
    return;
  }

  EducationQualification.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.json({
          message: "EducationQualification was deleted successfully!",
        });
      } else {
        res.json({
          message: `Cannot delete EducationQualification with id=${id}. Maybe EducationQualification was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Could not delete EducationQualification with id=" + id,
      });
    });
};
