require('dotenv').config();
const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB,
  process.env.USER,
  process.env.PASSWORD,
  {
    host: process.env.HOST,
    dialect: 'mysql'
  }
);


// exports.connect = () => {
//     sequelize.authenticate().then(() => {
//         console.log('Connection has been established successfully.');
//      }).catch((error) => {
//         console.error('Unable to connect to the database: ', error);
//      });
// }


const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

const Question = require("./Model/question")(sequelize);
const Quiz = require("./Model/quiz")(sequelize);
const Option = require("./Model/option")(sequelize);
const Submission = require("./Model/submission")(sequelize);
const SubmissionAnswer = require("./Model/submissionAnswer")(sequelize);

Quiz.hasMany(Question, { as: "questions" });

Option.belongsTo(Question, {
    foreignKey: "questionId",
    as: "question",
});

Question.hasMany(Option, { as: "options" });

Question.belongsTo(Quiz, {
  foreignKey: "quizId",
  as: "quiz",
});

Submission.belongsTo(Quiz, {
  foreignKey: "quizId",
  as: "quiz",
});

SubmissionAnswer.belongsTo(Submission, {
  foreignKey: "submissionId",
  as: "submission",
});

SubmissionAnswer.belongsTo(Question, {
  foreignKey: "questionId",
  as: "question",
});

db.Question = Question 
db.Option = Option 
db.Quiz = Quiz 
db.Submission = Submission 
db.SubmissionAnswer = SubmissionAnswer 
module.exports = db;