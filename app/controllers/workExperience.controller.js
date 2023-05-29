const db = require("../models");
const WorkExperience = db.workExperiences;
const Op = db.Sequelize.Op;
const moment = require("moment");

// Create and Save a new Work Experience
exports.create = (req, res) => {
  // Validate request
  if (!req.body.companyName) {
    res.status(400).json({
      message: "companyName can not be empty!",
    });
    return;
  }

  if (!req.body.startDate) {
    res.status(400).json({
      message: "Start Date can not be empty!",
    });
    return;
  }

  if (!req.body.endDate) {
    res.status(400).json({
      message: "End Date can not be empty!",
    });
    return;
  }

  if (!req.body.employeeId) {
    res.status(400).json({
      message: "Employee ID is missing",
    });
    return;
  }

  // Create a Work Experience
  const workExperience = {
    companyName: req.body.companyName,
    employeeId: req.body.employeeId,
    startDate: moment(req.body.startDate, "DD/MM/YYYY").format(),
    endDate: moment(req.body.endDate, "DD/MM/YYYY").format(),
  };

  // Save User in the database
  WorkExperience.create(workExperience)
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

  WorkExperience.findAll({
    where: {
      employeeId: employeeId,
    },
  })
    .then((data) => {
      if (data) {
        res.json(data);
      } else {
        res.status(404).json({
          message: `Cannot find WorkExperience for Employee id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error retrieving WorkExperience for Employee with id=" + id,
      });
    });
};

exports.findById = (req, res) => {
  const id = req.params.id;

  WorkExperience.findByPk(id)
    .then((data) => {
      if (data) {
        res.json(data);
      } else {
        res.status(404).json({
          message: `Cannot find WorkExperience with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error retrieving WorkExperience with id=" + id,
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;
  const workExperience = {
    companyName: req.body.companyName,
    employeeId: req.body.employeeId,
    id: req.body.id,
    startDate: moment(req.body.startDate, "DD/MM/YYYY", true).isValid()
      ? moment(req.body.startDate, "DD/MM/YYYY").format()
      : req.body.startDate,
    endDate: moment(req.body.endDate, "DD/MM/YYYY", true).isValid()
      ? moment(req.body.endDate, "DD/MM/YYYY").format()
      : req.body.endDate,
  };
  WorkExperience.update(workExperience, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        WorkExperience.findByPk(id)
          .then((data) => {
            if (data) {
              res.json(data);
            } else {
              res.status(404).json({
                message: `Cannot find WorkExperience with id=${id}.`,
              });
            }
          })
          .catch((err) => {
            res.status(500).json({
              message: "Error retrieving WorkExperience with id=" + id,
            });
          });
      } else {
        res.json({
          message: `Cannot update WorkExperience with id=${id}. Maybe WorkExperience was not found or req.body is empty!`,
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

  WorkExperience.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.json({
          message: "WorkExperience was deleted successfully!",
        });
      } else {
        res.json({
          message: `Cannot delete WorkExperience with id=${id}. Maybe WorkExperience was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Could not delete WorkExperience with id=" + id,
      });
    });
};
