import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
// importing routers
import OrdersCtrl from "./controllers/ordersController";
import ProductsCtrl from "./controllers/productsController";
import BlogCtrl from "./controllers/BlogController";
import UserCtrl from "./controllers/UserController";

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
  app.use(express.static("uploads"));
  app.use(bodyParser.json());
  app.use("/order", OrdersCtrl);
  app.use("/product", ProductsCtrl);
  app.use("/blog", BlogCtrl);
  app.use("/user", UserCtrl);

  const port = 8080;
  app.listen(port, () => {
    console.log("Server started at http://localhost:" + port);
  });
});
