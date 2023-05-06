require('dotenv').config();
require('express-async-errors');

const express = require('express');
const morgan = require('morgan');
const connectDB = require('./db/connect');

const authRouter = require('./routes/auth');

const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

const app = express();

app.use(morgan('tiny'));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('<h1>e-commerce api</h1>');
});

app.use('/api/v1/auth', authRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
