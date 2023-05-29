module.exports = (sequelize, Sequelize) => {
  const WorkExperience = sequelize.define("work_experience", {
    id: {
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      type: Sequelize.UUID,
    },
    companyName: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: { args: true, msg: "Company Name is missing." },
      },
    },
    startDate: {
      type: Sequelize.DATE,
      allowNull: false,
      validate: {
        notNull: { args: true, msg: "Start Date cannot be empty." },
      },
    },
    endDate: {
      type: Sequelize.DATE,
      allowNull: false,
      validate: {
        notNull: { args: true, msg: "End Date cannot be empty." },
      },
    },
  });

  return WorkExperience;
};
