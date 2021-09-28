import 'express-async-error';
import express from "express";
import {json} from "body-parser";
import mongoose from "mongoose";
// importing routers
import userController from './user/user.controller';
import authController from './auth.controller';
import productController from './products/product.controller';



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
  app.use("/uploads", express.static("uploads"));
  app.use(json());

  app.use("/user", userController)
  app.use("/auth", authController)
  app.use("/product", productController)


  app.use(function(err, req, res, next){
    console.log(err);
    
    res.status(500).send('Something failed.');
  })
    

  const port = 3000;
  app.listen(port, () => {
    console.log("Server started at http://localhost:" + port);
  });
});
