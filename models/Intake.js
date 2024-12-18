const Intake = (sequelize, DataTypes) => {
  return sequelize.define(
    "intake",
    {
      intake_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      mealtime: {
        type: DataTypes.ENUM("breakfast", "lunch", "dinner", "btwmeal"),
        allowNull: false,
      },
      carbo: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      protein: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      fat: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      fiber: {
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

module.exports = Intake;
