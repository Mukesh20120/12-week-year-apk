const express = require("express");
const cors = require("cors");
const connectUrl = require("./db/connect");
const morgan = require('morgan')

//middleware
const {
  notFoundMiddleware,
  errorHandlerMiddleware,
} = require("./middleware");

//router
const yearRouter = require('./routers/yearRouter');
const monthRouter = require('./routers/monthRouter');
const dayRouter = require('./routers/dayRouter');
const authRouter = require('./routers/authRouter');

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('combined'));

const port = 5000;

app.use("/api/v1/year", yearRouter);
app.use("/api/v1/month", monthRouter);
app.use("/api/v1/day", dayRouter);
app.use("/api/v1/auth",authRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const Start = async () => {
  try {
    await connectUrl();
    app.listen(port, () => {
      console.log('connected to db...')
      console.log(`server is running on ${port}`);
    });
  } catch (error) {
    console.log("server not started");
  }
};

Start();
