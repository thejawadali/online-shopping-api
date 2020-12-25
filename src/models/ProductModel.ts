import * as mongoose from "mongoose";

const Schema = mongoose.Schema;

export interface IProduct extends mongoose.Document {
  productName: string;
  des: string;
  price: number;
  productImage: string;
}

//A model is a class with which we construct documents
const mySchema = new Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    des: {
      type: String,
      required: true,
    },
    price: {
      required: "Price of product is required",
      type: Number,
    },
    productImage: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
mySchema.query.byName = function(name){
  return this.where({productName: name})
}


export default mongoose.model<IProduct>("Product", mySchema);
