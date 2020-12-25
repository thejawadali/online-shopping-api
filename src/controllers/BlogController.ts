import { Router } from "express";
import * as mongoose from "mongoose";

const router = Router();
const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  body: String,
  comments:[
    {
      body: String, 
      date: {
        type: Date,
        default:Date.now
      }
    }
  ],
  date:{
    type: Date,
    default: Date.now
  },
  hidden: Boolean,
  meta:{
    votes: Number,
    favs: Number
  }
})
blogSchema.query.byTitle = function(title){
  return this.where({title: title})
}

const model = mongoose.model("Blog", blogSchema)


router.post("/",async (req, res)=>{
  console.log("here");
  
  const blog = new model(
  {
    title: "My Blog",
    author: "Alan Walker",
    body: "Meri body",
    comments: [
      {
        body:"c1"
      },
      {
        body:"c2"
      }
    ],
    hidden: false,
    meta:{
      votes: 2,
      favs: 3
    }
  }
  )
  
  await blog.save()
  res.send("success")
})

export default router