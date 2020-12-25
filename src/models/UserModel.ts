import * as mongoose from "mongoose";
import myValidator from "../core/myValidator";

export interface IUser extends mongoose.Document {
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: "email address is required",
    validate: myValidator.email,
    unique: "User has already registered with the given email address"
  },
  password: {
    type: String,
    required: "Password is required",
  },
});

export default mongoose.model<IUser>("User", userSchema);
