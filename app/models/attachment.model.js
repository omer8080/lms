module.exports = (sequelize, Sequelize) => {
  const Attachment = sequelize.define("attachment", {
    id: {
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      type: Sequelize.UUID,
    },
    type: {
      type: Sequelize.STRING,
    },
    name: {
      type: Sequelize.STRING,
    },
    data: {
      type: Sequelize.BLOB("long"),
    },
  });

  return Attachment;
};