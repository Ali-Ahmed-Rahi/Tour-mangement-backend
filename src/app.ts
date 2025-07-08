import express from 'express';
const app = express()
import  {Request,Response} from 'express';


app.get("/",(req:Request , res:Response )=>{
res.status(200).json({
  massage:"welcome to tour ManageMent"
})
})

export default app