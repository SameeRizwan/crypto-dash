const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const Submission = sequelize.define('submission', {
        userId: DataTypes.INTEGER,  // The User that will submit quiz
        timeTaken: DataTypes.INTEGER,  //Time taken in minutes
    },
        { timestamps: false }
    )
    return Submission
}