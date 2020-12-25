import { Router } from "express";
import UserModel from "../models/UserModel";
import myValidator from "../core/myValidator";
import { body } from "express-validator";
import bcrypt, { hash } from "bcrypt";
import { validationErrorChecker } from "../core/error-handler";
import { restart } from "nodemon";
import jwt from "jsonwebtoken";

const router = Router();

router.post("/signup", (req, res) => {
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      return res.status(500).json({
        error: err,
      });
    } else {
      const newUser = new UserModel();
      newUser.set({
        email: req.body.email,
        password: hash
      });
      newUser.save().then((result) => {
        res.status(201).json({
          message: "User created successfully",
          user: newUser
        })
      }).catch((err) => {
        res.status(500).json({
          error: err
        })
      });
    }
  });
});

router.post("/login", (req, res)=>{
  UserModel.find({email: req.body.email}).exec().then((result) => {

    if(result.length < 1){
      return res.status(401).json({
        message: "Auth failed"
      })
    }
    bcrypt.compare(req.body.password, result[0].password, (err, r)=>{
      if (err) {
        return res.status(401).json({
          message: "Auth failed"
        })
      }
      if (r) {
        const token = jwt.sign(
          {
            email: result[0].email,
            userId: result[0]._id
          },
          "secret",
          {
            expiresIn: "1h"
          }
        )
        return res.status(201).json({
          message: "logged in",
          token: token
        })
      }
      return res.status(401).json({
        message: "Auth failed"
      })
    })
  }).catch((err) => {
    res.status(500).json({
      error: err
    })
  });
})

export default router;
