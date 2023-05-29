// create a model for the database using sequelize for leave having column as id, startDate, endDate, status & leaveType

module.exports = (sequelize, Sequelize) => {
  const Leave = sequelize.define("leave", {
    id: {
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      type: Sequelize.UUID,
    },
    startDate: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    endDate: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    status: {
      type: Sequelize.ENUM("NEW", "SUBMITTED", "APPROVED", "REJECTED"),
      allowNull: false,
    },
    leaveType: {
      type: Sequelize.ENUM("ANNUAL_LEAVE", "MEDICAL_LEAVE", "EMERGENCY_LEAVE"),
      allowNull: false,
    },
    rejectReason: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  });

  return Leave;
};
