import express from 'express';
const app = express()
import { Request, Response } from 'express';
import cors from 'cors';
import { router } from './app/routes';


import { globalErrorHandler } from './app/middlewares/globalErrorHandler';
import { notFound } from './app/middlewares/notFound';

app.use(express.json())
app.use(cors())



app.use("/api/v1", router)


app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    massage: "welcome to tour ManageMent system"
  })
})


// Global error handler
app.use(globalErrorHandler)
app.use(notFound)



export default app