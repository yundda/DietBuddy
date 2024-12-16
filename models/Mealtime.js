const Mealtime = (sequelize, DataTypes) => {
  return sequelize.define(
    "mealtime",
    {
      mealtime_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      mealtime: {
        type: DataTypes.ENUM("breakfast", "lunch", "dinner", "btwmeal"),
        allowNull: false,
      },
    },
    {
      timestamps: true,
      freezeTableName: true,
    }
  );
};

module.exports = Mealtime;
