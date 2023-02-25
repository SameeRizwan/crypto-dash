const db = require('./db')
const express = require('express')
const app = express()
const quizRouter = require('./Routes/quizRoutes')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// db.connect();
db.sequelize.sync();

app.use('/api',quizRouter)

app.get('/', (req, res, next) => {
  res.send(`Server started`)
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});