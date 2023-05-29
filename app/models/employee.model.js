module.exports = (sequelize, Sequelize) => {
  const Employee = sequelize.define("employee", {
    id: {
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      type: Sequelize.UUID,
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isLowercase: true,
      },
      unique: true,
    },
    dob: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    gender: {
      type: Sequelize.ENUM("MALE", "FEMALE", "OTHERS"),
      allowNull: false,
      validate: {
        notNull: { args: true, msg: "Gender is missing." },
        isIn: {
          args: [['MALE', 'FEMALE', 'OTHERS']],
            msg: "Please pass proper values for Gender."
        }
      },
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isEmail: { args: true, msg: "Incorrect Email." },
      },
      unique: true,
    },
    position: {
      type: Sequelize.ENUM("DEVELOPER", "MANAGER", "BA", "DB", "DEVOPS", "TESTER"),
      validate: {
        notNull: { args: true, msg: "Position is missing." },
        isIn: {
          args: [["DEVELOPER", "MANAGER", "BA", "DB", "DEVOPS", "TESTER"]],
            msg: "Please pass proper values for Position."
        }
      },
      allowNull: false,
    },
    phoneNo: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    role: {
      type: Sequelize.ENUM("HR", "EMPLOYEE", "CEO"),
      validate: {
        notNull: { args: true, msg: "Role is missing." },
        isIn: {
          args: [["HR", "EMPLOYEE", "CEO"]],
            msg: "Please pass proper values for Role."
        }
      },
      allowNull: false,
    },
  });

  return Employee;
};
