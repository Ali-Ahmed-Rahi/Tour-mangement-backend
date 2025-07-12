/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express"
import { catchAsync } from "../../utils/catchAsync"
import { sendResponse } from "../../utils/sandResponse"
import httpStatus from "http-status-codes"
import { AuthServices } from "./auth.service"

const credentialsLogin=catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  // const user = await UserServices.createUser(req.body)


  const loginInfo=await AuthServices.credentialsLogin(req.body)



  sendResponse(res,{
    success:true,
    statusCode:httpStatus.OK,
    massage:"User Logged in Created Successfully",
    data:loginInfo
  })

})

export const AuthControllers={
  credentialsLogin
}