const db = require('../db')
const Quiz = db.Quiz
const Question = db.Question
const Option = db.Option
const RESPONSE_CODE = require('../Utils/response')

createAndPublishQuiz = async (req, res, next) => {

    try {
        const quiz = await Quiz.create({
            name: req.body.name,
            description: req.body.description,
            active: "true",
            userId: req.body.userId
        });

        saveQuestion(req.body.Question, quiz)
        res.status(RESPONSE_CODE[200]).json({ success: "true", error: "null", data: "null" })
    }
    catch (err) {
        res.status(RESPONSE_CODE[500]).json({ success: "false", error: err.message, data: "null" })
    }
}

saveAsDraftQuiz = async (req, res, next) => {
    try {
        const quiz = await Quiz.create({
            name: req.body.name,
            description: req.body.description,
            active: "false",
            userId: req.body.userId
        });

        saveQuestion(req.body.Question, quiz)
        res.status(RESPONSE_CODE[200]).json({ success: "true", error: "null", data: "null" })

    }
    catch (err) {
        res.status(RESPONSE_CODE[500]).json({ success: "false", error: err.message, data: "null" })
    }

}

getAllQuiz = async (req, res, next) => {
    try {
        let allQuizes = [];
        let quizDetail = {}

        const quizes = await Quiz.findAll();

        allQuizes = await Promise.all(quizes.map(async (quiz) => {
            const questions = await Question.findAll({ where: { QuizId: quiz.id } })
            quizDetail = await getQuestionAndOptions(questions)
            let data = {
                name: quiz.dataValues.name,
                description: quiz.dataValues.description,
                active: quiz.dataValues.active,
                Question: quizDetail
            }
            console.log(data)
            return data
        }))
        res.status(RESPONSE_CODE[200]).json({ success: "true", error: "null", data: allQuizes })
    }
    catch (err) {
        res.status(RESPONSE_CODE[500]).json({ success: "false", error: err.message, data: "null" })
    }
}

getQuiz = async (req, res, next) => {
    try {
        let quizDetail = {}

        const quiz = await Quiz.findByPk(req.params.id);
        const questions = await Question.findAll({ where: { QuizId: quiz.id } })
        quizDetail = await getQuestionAndOptions(questions)
        let data = {
            name: quiz.dataValues.name,
            description: quiz.dataValues.description,
            active: quiz.dataValues.active,
            Question: quizDetail
        }
        res.status(RESPONSE_CODE[200]).json({ success: "true", error: "null", data: data })
    }
    catch (err) {
        res.status(RESPONSE_CODE[500]).json({ success: "false", error: err.message, data: "null" })
    }
}

getQuestionAndOptions = async (questions) => {
    return quizDetail = await Promise.all(questions.map(async (question) => {
        const options = await Option.findAll({ where: { QuestionId: question.id } })
        const refinedOptions = options.map((option) => {
            return option = {
                name: option.dataValues.name,
                answer: option.dataValues.answer,
            }
        })
        const refinedQuestion = question.dataValues
        return quizDetail =
        {
            name: refinedQuestion.name,
            mandatory: refinedQuestion.mandatory,
            option: refinedOptions
        }
    }))
}

saveQuestion = (questions, quiz) => {
    try {
        questions.map(async (question) => {

            const savedQuestion = await Question.create({
                name: question.name,
                mandatory: question.mandatory,
                QuizId: quiz.id
            });

            const options = question.option;
            saveOptions(options, savedQuestion)
        })
    }
    catch (err) {
        throw new Error("Error while storing the Question")
    }
}


saveOptions = (options, savedQuestion) => {
    try {
        options.map(async (option) => {
            await Option.create({
                name: option.name,
                answer: option.answer,
                QuestionId: savedQuestion.id
            });
        })
    }
    catch (err) {
        throw new Error("Error while storing the Question")
    }
}

module.exports = {
    createAndPublishQuiz,
    saveAsDraftQuiz,
    getAllQuiz,
    getQuiz,
};