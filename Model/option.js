const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const Option = sequelize.define('option', {
    description: DataTypes.STRING,
    correctAnswer: DataTypes.BOOLEAN, 
    })
    return Option
}
