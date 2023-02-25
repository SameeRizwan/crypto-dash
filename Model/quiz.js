const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
const Quiz = sequelize.define('Quiz', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    active: DataTypes.BOOLEAN,
    userId: DataTypes.INTEGER
  })
  return Quiz
}