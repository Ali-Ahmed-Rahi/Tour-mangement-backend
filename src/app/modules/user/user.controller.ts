/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes"
import { UserServices } from "./user.service";
import AppError from "../../errorHelpers/AppError";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sandResponse";




const createUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const user = await UserServices.createUser(req.body)
  sendResponse(res,{
    success:true,
    statusCode:httpStatus.CREATED,
    massage:"User Created Successfully",
    data:user
  })

})

const getAllUsers = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
  
    const result = await UserServices.getAllUsers()

    // res.status(httpStatus.OK).json({
    //   success:true,
    //   message:"All Users Retrieved Successfully",
    //   data:users
    // })

    sendResponse(res,{
    success:true,
    statusCode:httpStatus.CREATED,
    massage:"All Users Retrieved Successfully",
    data:result.data,
    meta:result.meta
  })
  
})


export const UserControllers = {
  createUser,
  getAllUsers
}