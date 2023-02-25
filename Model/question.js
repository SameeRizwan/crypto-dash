const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {

const Question = sequelize.define('Question', {
    name: DataTypes.STRING,
    mandatory: DataTypes.BOOLEAN,
  })
  return Question
}