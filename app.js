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

app.get('/', (req, res, next) => {
  res.send(`Server started listening at http://localhost:${port}`)
})

app.listen(port, () => {
  console.log(`Server started listening at http://localhost:${port}`)
})
