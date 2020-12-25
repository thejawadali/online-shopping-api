import OrderModel from '../models/OrderModel';

exports.orders_get_order = async (req, res) => {
  // const orders = await OrderModel.find().populate("product", "productName")
  const orders = await OrderModel.find().populate("product",)
  res.json({
    message: "got it right",
    orders
  })
}