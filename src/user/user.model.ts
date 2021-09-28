import { Document, Schema, model } from "mongoose";
import { IProduct } from "../products/product.model"

export interface IUser extends Document{
  email: string
  name: string
  password: string
}

const schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    default: ""
  },
  password: {
    type: String,
    required: true
  }
})

export default model<IUser>("User", schema)