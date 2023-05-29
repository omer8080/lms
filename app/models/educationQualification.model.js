module.exports = (sequelize, Sequelize) => {
  const educationQualification = sequelize.define("education_qualification", {
    id: {
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      type: Sequelize.UUID,
    },
    course: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: { args: true, msg: "Course is missing." },
      },
    },
    institute: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: { args: true, msg: "Institute cannot be empty." },
      },
    },
    passDate: {
      type: Sequelize.DATE,
      allowNull: false,
      validate: {
        notNull: { args: true, msg: "Pass Date cannot be empty." },
      },
    },
  });

  return educationQualification;
};
