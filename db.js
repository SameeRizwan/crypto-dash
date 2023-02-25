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


Quiz.hasMany(Question, { as: "questions" });

Option.belongsTo(Question, {
    foreignKey: "QuestionId",
    as: "question",
});

Question.hasMany(Option, { as: "options" });

Question.belongsTo(Quiz, {
  foreignKey: "QuizId",
  as: "quiz",
});

db.Question = Question 
db.Option = Option 
db.Quiz = Quiz 

module.exports = db;