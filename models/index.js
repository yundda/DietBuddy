"use strict";

const Sequelize = require("sequelize");

const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.js")[env];

const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

const UserModel = require("./User")(sequelize, Sequelize);
const UserGoalModel = require("./UserGoal")(sequelize, Sequelize);
const IntakeModel = require("./Intake")(sequelize, Sequelize);
const MealtimeModel = require("./Mealtime")(sequelize, Sequelize);

// User : UserGoal = 1 : 1
UserModel.hasOne(UserGoalModel, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  foreignKey: "goal_id",
});
UserGoalModel.belongsTo(UserModel, {
  foreignKey: "id",
});

// User : Intake = 1 : N
UserModel.hasMany(IntakeModel, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  foreignKey: "id",
});
IntakeModel.belongsTo(UserModel, {
  foreignKey: "id",
});

// (4) db 객체에 모델 추가
db.User = UserModel;
db.UserGoal = UserGoalModel;
db.Intake = IntakeModel;
db.Mealtime = MealtimeModel;

module.exports = db;
