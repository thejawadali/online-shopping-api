import {Router} from 'express';
import userModel, { IUser } from "./user/user.model"
import { hashPassword } from "./core/crytp";
import { Token } from "./core/Auth"
const router = Router()

router.post("/register", async (req, res) => {
  const newUser = new userModel({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword(req.body.password)
  } as IUser)
  await newUser.save()
  const token = Token({
    _id: newUser._id
  })
  res.json({newUser, token})
})

router.post("/login", async (req, res) => {
  const user = await userModel.findOne({
    email: req.body.email,
    password: hashPassword(req.body.password)
  })
  if (!user) {
    return res.send("No user found")
  }
  const token = Token({
    _id: user._id
  })
  res.json({user, token})
})

export default router