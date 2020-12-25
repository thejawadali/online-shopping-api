import { Router } from "express";
import { body } from "express-validator";
import { validationErrorChecker } from "../core/error-handler"
import OrderModel from "../models/OrderModel";
import ProductModel from "../models/ProductModel";
// import * as order from '../newco/order';
const order = require("../newco/order")

const router = Router();

router.get("/", order.orders_get_order);


router.post("/",
[body("quantity", "Quantity of order").exists().isNumeric()],
[body("product", "Enter valid product id").exists().isMongoId()],
validationErrorChecker,
async (req, res)=>{
  const productExists = await ProductModel.findOne({_id: req.body.product})
  if(!productExists) {throw "no product found with given id"}
  const order = new OrderModel()
  order.quantity = req.body.quantity
  order.product = req.body.product
  await order.save()
  res.send("A new order added")
}
)

export default router;
