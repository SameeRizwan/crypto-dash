const db = require('../db')
const Quiz = db.Quiz
const Question = db.Question
const Option = db.Option
const Submission = db.Submission
const SubmissionAnswer = db.SubmissionAnswer
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

        saveQuestion(req.body.Question, quiz.dataValues)
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
                question: quizDetail
            }
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
            question: quizDetail
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
                description: option.dataValues.description,
                answer: option.dataValues.answer,
            }
        })
        const refinedQuestion = question.dataValues
        return quizDetail =
        {
            id: refinedQuestion.id,
            description: refinedQuestion.description,
            mandatory: refinedQuestion.mandatory,
            option: refinedOptions
        }
    }))
}

submitQuiz = async (req, res, next) => {
    try {
        const quizSubmitted = await Submission.create({
            userId: req.body.userId,
            quizId: req.body.quizId,
            timeTaken: req.body.timeTaken,
        });

        req.body.Questions.map(async (question) => {
            await SubmissionAnswer.create({
                submissionId: quizSubmitted.dataValues.id,
                questionId: question.id,
                optionSelected: question.selected
            });
        })
        res.status(RESPONSE_CODE[200]).json({ success: "true", error: "null", data: "Submitted Successfully" })
    }
    catch (err) {
        res.status(RESPONSE_CODE[500]).json({ success: "false", error: err.message, data: "null" })
    }

}

saveQuestion = (questions, quiz) => {

    try {
        questions.map(async (question) => {
            const savedQuestion = await Question.create({
                description: question.description,
                mandatory: question.mandatory,
                quizId: quiz.id
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
                description: option.description,
                answer: option.answer,
                questionId: savedQuestion.id
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
    submitQuiz
};