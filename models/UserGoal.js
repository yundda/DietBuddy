const UserGoal = (sequelize, DataTypes) => {
  return sequelize.define(
    "user_goal",
    {
      goal_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      weight: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      height: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      gender: {
        type: DataTypes.ENUM("Male", "Female"),
        allowNull: false,
      },
      activeLevel: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      goalWeight: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      period: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      dietGoal: {
        type: DataTypes.ENUM("Gain", "Loss", "Stay"),
        allowNull: false,
      },
      BMR: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      AMR: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      recomIntake: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      recomCarbo: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      recomProtein: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      recomFat: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      timestamps: true,
      freezeTableName: true,
    }
  );
};

module.exports = UserGoal;
