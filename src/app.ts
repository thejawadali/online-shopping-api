import express from "express";
import {json} from "body-parser";
import mongoose from "mongoose";
// importing routers
import userController from './user/user.controller';
import authController from './auth.controller';



const dbName = "shopping";
const mongoURI = `mongodb://localhost:27017/${dbName}`;

const app = express();

const db = mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});



db.then(() => {
  console.log("db connected");
  // app.use(express.static("uploads"));
  app.use(json());

  app.use("/user", userController)
  app.use("/auth", authController)

  const port = 3000;
  app.listen(port, () => {
    console.log("Server started at http://localhost:" + port);
  });
});
