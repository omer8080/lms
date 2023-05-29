const db = require("../models");
const Leave = db.leaves;
const moment = require("moment");

// Create and Save a new Leave
exports.create = (req, res) => {
  // Validate request
  if (!req.body.leaveType) {
    res.status(400).json({
      message: "Leave Type can not be empty!",
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

  if (moment(req.body.startDate).isAfter(req.body.endDate)) {
    res.status(400).json({
      message: "Start Date can not be greater than End Date!",
    });
    return;
  }

  const userRole = req.user.role;
  if (userRole !== "EMPLOYEE") {
    res.status(401).json({
      message: "You are not allowed to apply Leave",
    });
    return;
  }

  // Create a Leave
  const leave = {
    leaveType: req.body.leaveType,
    startDate: moment(req.body.startDate, "DD/MM/YYYY").format(),
    endDate: moment(req.body.endDate, "DD/MM/YYYY").format(),
    status: "NEW",
    employeeId: req.body.employeeId,
  };

  // Save User in the database
  Leave.create(leave)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message || "Some error occurred while creating the Leave.",
      });
    });
};

exports.findAllLeaves = (req, res) => {
  const userRole = req.user.role;
  if (userRole !== "HR") {
    res.status(401).json({
      message: "You are not allowed to view all Leaves",
    });
    return;
  }

  Leave.findAll()
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

exports.findAllByEmployeeId = (req, res) => {
  const employeeId = req.params.employeeId;

  const userRole = req.user.role;
  if (userRole !== "EMPLOYEE") {
    res.status(401).json({
      message: "You are not allowed to view all Leaves",
    });
    return;
  }

  Leave.findAll({
    where: {
      employeeId: employeeId,
    },
  })
    .then((data) => {
      if (data) {
        res.json(data);
      } else {
        res.status(404).json({
          message: `Cannot find Leave for Employee id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error retrieving Leave for Employee with id=" + id,
      });
    });
};

exports.findById = (req, res) => {
  const id = req.params.id;

  const userRole = req.user.role;
  if (userRole === "CEO") {
    res.status(401).json({
      message: "You are not allowed to view leave details",
    });
    return;
  }

  Leave.findByPk(id)
    .then((data) => {
      if (data) {
        res.json(data);
      } else {
        res.status(404).json({
          message: `Cannot find Leave with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error retrieving Leave with id=" + id,
      });
    });
};

exports.submit = (req, res) => {
  const userRole = req.user.role;
  if (userRole !== "HR") {
    res.status(401).json({
      message: "You are not allowed to submit Leave",
    });
    return;
  }

  // Submit a Leave
  const leave = {
    status: "SUBMITTED",
  };

  // Save User in the database
  Leave.update(leave, {
    where: { id: req.params.id },
  })
    .then((num) => {
      if (num == 1) {
        Leave.findByPk(req.params.id)
          .then((data) => {
            if (data) {
              res.json(data);
            } else {
              res.status(404).json({
                message: `Cannot find Leave with id=${id}.`,
              });
            }
          })
          .catch((err) => {
            res.status(500).json({
              message: "Error retrieving Leave with id=" + id,
            });
          });
      } else {
        res.json({
          message: `Cannot update Leave with id=${id}. Maybe Leave was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: err,
      });
    });
};

exports.approve = (req, res) => {
  const userRole = req.user.role;
  if (userRole !== "CEO") {
    res.status(401).json({
      message: "You are not allowed to approve Leave",
    });
    return;
  }

  if (!req.params.id) {
    res.status(400).json({
      message: "Leave ID can not be empty!",
    });
    return;
  }

  // Create a Leave
  const leave = {
    status: "APPROVED",
  };

  // Save User in the database
  Leave.update(leave, {
    where: { id: req.params.id },
  })
    .then((num) => {
      if (num == 1) {
        Leave.findByPk(req.params.id)
          .then((data) => {
            if (data) {
              res.json(data);
            } else {
              res.status(404).json({
                message: `Cannot find Leave with id=${req.params.id}.`,
              });
            }
          })
          .catch((err) => {
            res.status(500).json({
              message: "Error retrieving Leave with id=" + req.params.id,
            });
          });
      } else {
        res.json({
          message: `Cannot update Leave with id=${req.params.id}. Maybe Leave was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: err,
      });
    });
};

exports.reject = (req, res) => {
  const userRole = req.user.role;
  if (userRole !== "CEO") {
    res.status(401).json({
      message: "You are not allowed to reject Leave",
    });
    return;
  }

  if (!req.params.id) {
    res.status(400).json({
      message: "Leave ID can not be empty!",
    });
    return;
  }

  if (!req.body.rejectReason) {
    res.status(400).json({
      message: "Reject Reason can not be empty!",
    });
    return;
  }

  // Create a Leave
  const leave = {
    status: "REJECTED",
    rejectReason: req.body.rejectReason,
  };

  // Save User in the database
  Leave.update(leave, {
    where: { id: req.params.id },
  })
    .then((num) => {
      if (num == 1) {
        Leave.findByPk(req.params.id)
          .then((data) => {
            if (data) {
              res.json(data);
            } else {
              res.status(404).json({
                message: `Cannot find Leave with id=${req.params.id}.`,
              });
            }
          })
          .catch((err) => {
            res.status(500).json({
              message: "Error retrieving Leave with id=" + req.params.id,
            });
          });
      } else {
        res.json({
          message: `Cannot update Leave with id=${req.params.id}. Maybe Leave was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: err,
      });
    });
};
