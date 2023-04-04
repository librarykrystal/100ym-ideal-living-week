const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const answerRouter = require('./routes/answer.router');
const categoryRouter = require('./routes/category.router');
const priorityRouter = require('./routes/priority.router');
const questionRouter = require('./routes/question.router');
const idealWeek = require('./routes/idealWeek.router');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/answer', answerRouter);
app.use('/api/category', categoryRouter);
app.use('/api/questions', questionRouter);
app.use('/api/priority', priorityRouter);
app.use('/api/idealWeek', idealWeek);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
