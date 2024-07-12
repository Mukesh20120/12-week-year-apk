const express = require("express");
const cors = require("cors");
const connectUrl = require("./db/connect");

//middleware
const {
  notFoundMiddleware,
  errorHandlerMiddleware,
} = require("./middleware");

//router
const todoRouter = require("./routers/todoRouter");
const yearRouter = require('./routers/yearRouter');

const app = express();

app.use(cors());
app.use(express.json());

const port = 5000;

app.use("/api/v1/todo", todoRouter);
app.use("/api/v1/year", yearRouter);

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
