import {Router} from 'express';
import { Authorization } from "../core/Auth"
const router = Router()

router.get("/test", Authorization, (req, res)=>{
  res.send("hello")
})

export default router