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
        
        saveQuestion(req.body.Question,quiz)
        res.status(RESPONSE_CODE[200]).json({success:"true",error:"null",data:"null"})
    }
    catch (err) {
        res.status(RESPONSE_CODE[500]).json({success:"false",error: err.message,data:"null"})
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

        saveQuestion(req.body.Question,quiz)
        res.status(RESPONSE_CODE[200]).json({success:"true",error:"null",data:"null"})

    }
    catch (err) {
        res.status(RESPONSE_CODE[500]).json({success:"false",error: err.message,data:"null"})
    }

}

getAllQuiz = async (req, res, next) => {
    try {
        let allQuizes = [];
        let quizDetail = {}
        
        const quizes = await Quiz.findAll();


        console.log(quizes)

        quizes.map(async (quiz) => {            
            const questions = await Question.findAll({where: {QuizId:quiz.id}})
            questions.map(async (question) => {
                const options = await Option.findAll({where: {QuestionId:question.id}})
                const quizValue = quiz.dataValues
                
                console.log(quizDetail)

                quizDetail = {
                    Question:[
                        question.dataValues,
                        options.dataValues
                    ]
                }
                console.log(options.dataValues)
            })
        })

        
        res.send(allQuizes)
    }
    catch (err) {
        console.log(err)
    }
}

getQuiz = async (req, res, next) => {


}

saveQuestion = (questions,quiz) => {
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
};