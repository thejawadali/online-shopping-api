import jwt from "jsonwebtoken";
import userModel from "../user/user.model"

export function Token(userObj: object){
  return jwt.sign(userObj, "secret-key")
}

export function Authorization(req, res, next){
  const token = req.header("Authorization")
  
  if (!token) {
    return res.send("Invalid token")
  }

  jwt.verify(token, "secret-key", (err, doc)=>{
    if (err) {
      return res.send(err)
    }
    if (doc) {
      userModel.findOne({
        _id: doc._id
      }).then((user) => {
        console.log(user);
        next()
      }).catch((err) => {
        return res.send(err)
      });

    }
  })
}