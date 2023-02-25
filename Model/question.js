const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {

const Question = sequelize.define('question', {
  description: DataTypes.STRING,
  mandatory: DataTypes.BOOLEAN,
  })
  return Question
}