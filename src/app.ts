import express from 'express';
import { Request, Response } from 'express';
import cors from 'cors';
import { router } from './app/routes';
import cookieParser from 'cookie-parser';
import { globalErrorHandler } from './app/middlewares/globalErrorHandler';
import { notFound } from './app/middlewares/notFound';
import passport from 'passport';
import "./app/config/passport";
import expressSession from"express-session"
const app = express()

app.use(expressSession(
  {
    secret:"your Secret",
    resave:false,
    saveUninitialized:false
  }
))
app.use(passport.initialize())
app.use(passport.session())
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
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