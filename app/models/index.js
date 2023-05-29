const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.tutorials = require("./tutorial.model.js")(sequelize, Sequelize);
db.employees = require("./employee.model.js")(sequelize, Sequelize);
db.workExperiences = require("./workExperience.model.js")(sequelize, Sequelize);
db.educationQualifications = require("./educationQualification.model.js")(sequelize, Sequelize);
db.attachments = require("./attachment.model.js")(sequelize, Sequelize);
db.leaves = require("./leave.model.js")(sequelize, Sequelize);

db.employees.hasMany(db.workExperiences, { as: "workExperiences", onDelete: "cascade" });
db.employees.hasMany(db.educationQualifications, { as: "educationQualifications", onDelete: "cascade" });
db.employees.hasMany(db.attachments, { as: "attachments", onDelete: "cascade" });
db.employees.hasMany(db.leaves, { as: "leaves", onDelete: "cascade" });
db.workExperiences.belongsTo(db.employees, {
  foreignKey: "employeeId",
  as: "employee",
});
db.educationQualifications.belongsTo(db.employees, {
  foreignKey: "employeeId",
  as: "employee",
});
db.attachments.belongsTo(db.employees, {
  foreignKey: "employeeId",
  as: "employee",
});
db.leaves.belongsTo(db.employees, {
  foreignKey: "employeeId",
  as: "employee",
});

module.exports = db;