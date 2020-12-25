import * as mongoose from "mongoose";
// import * as autopopulate from "mongoose-autopopulate";
import ProductModel, { IProduct } from "./ProductModel";

const Schema = mongoose.Schema;

export interface IOrder extends mongoose.Document {
  product: IProduct | String; // FK
  quantity: number;
}

const mySchema = new Schema(
  {
    product: {
      type: Schema.Types.ObjectId,
      // autopopulate: true,
      // autopopulate: {

      // },
      required: true, 
      ref: ProductModel.modelName, // "Product"
    },
    quantity: {
      type: Number,
      required: true
    },
  },
  {
    timestamps: true,
  }
);


// mySchema.plugin(require("mongoose-unique-validator"))
// mySchema.plugin(mongooseSanitize)
// mySchema.plugin(idValidator)
// mySchema.plugin(autopopulate)
// mySchema.set("toObject", { getters: true })
// mySchema.set("toJSON", { getters: true })
export default mongoose.model<IOrder>("Order", mySchema);
