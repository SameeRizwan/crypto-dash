const express = require("express");
const router = express.Router();
const quizController = require('../Controller/quizController')

router
  .get("/quizs", quizController.getAllQuiz)
  .post("/quiz", quizController.createAndPublishQuiz)
  .post("/quiz/draft", quizController.saveAsDraftQuiz)
  .get("/quiz/:id", quizController.getQuiz);
  // .delete("/quiz/:id", quizController.deleteQuiz);
  // .get("/quiz/:userId", quizController.getAllUserQuizs)

router
.post("/quiz/submit", quizController.submitQuiz)

module.exports = router;