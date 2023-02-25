const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const Option = sequelize.define('option', {
    description: DataTypes.STRING,
    answer: DataTypes.BOOLEAN, 
    })
    return Option
}
