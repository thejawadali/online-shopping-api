import { Document, Schema, model } from "mongoose";
import { IUser } from "../user/user.model"

export interface IProduct extends Document{
  image?: string
  title: string
  price: number 
  userName: string
}

const schema = new Schema({
  userName: {
    type: String,
    required: true
  },
  image: {
    type: String
  },
  title: {
    type: String
  },
  price: {
    type: Number
  }
}, 
{
  timestamps: true
})

export default model<IProduct>("Product", schema)