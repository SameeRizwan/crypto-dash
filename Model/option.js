const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const Option = sequelize.define('Option', {
    name: DataTypes.STRING,
    answer: DataTypes.BOOLEAN, 
    })
    return Option
}
