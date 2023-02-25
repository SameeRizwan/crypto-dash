const db = require('./db')
const express = require('express')
const app = express()
const port = 3000
const quizRouter = require('./Routes/quizRoutes')



app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// db.connect();
db.sequelize.sync();

app.use('/api',quizRouter)

app.listen(port, () => {
  console.log(`Servern started listening at http://localhost:${port}`)
})
