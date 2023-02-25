const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const SubmissionAnswer = sequelize.define('submissionAnswer', {
        optionSelected: DataTypes.INTEGER
    },
        { timestamps: false }
    )
    return SubmissionAnswer
}