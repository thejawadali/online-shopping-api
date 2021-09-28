import {Router} from 'express';
import multer from "multer";
import userModel from "../user/user.model"
import productModel, { IProduct } from "./product.model";

const storage = multer.diskStorage({
  destination: (req, file, cb) =>{
    cb(null, "./uploads/")
  },
  filename: (req, file, cb)=>{
    cb(null, `${new Date().toISOString()}-${file.originalname}`)
  }
})


const fileFilter = (req, file, cb)=>{
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
    cb(null, true)
  }else{
    cb(new Error("Wrong Format"), false)
  }
}

const upload = multer({storage, limits:{
  fileSize: 1024 * 1024 * 5 // 5 MB
}, fileFilter
})
const router = Router()

router.post("/test", async (req, res)=>{
  try {
    const user = await userModel.findOne({
      _id: req.body.userId
    })
    
  
    const product = new productModel({
      title: "title",
      price: 123,
      userName: user.name
    } as IProduct)
    res.json(product)
  
  } catch (error) {
    res.send(error.path)
  }
  
})

router.post("/", upload.single("image"),async (req, res)=>{

  // const user = await userModel.findOne({
  //   _id: req.body.userId
  // })
  // if (!user) {
    
  // }

  const product = new productModel({
    title: "new product",
    price: 123,
    userName: "ali",
    // userName: user? user.name : "no",
    image: req.file.path
  } as IProduct)
  // await product.save()
  res.json(product)
})

export default router