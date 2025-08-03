/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes"
import { UserServices } from "./user.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sandResponse";
import { verifyToken } from "../../utils/jwt";
import { envVars } from "../../config/env";
import { JwtPayload } from "jsonwebtoken";




const createUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const user = await UserServices.createUser(req.body)
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    massage: "User Created Successfully",
    data: user
  })

})


const updateUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.id;
  // const token=req.headers.authorization
  // const verifiedToken=verifyToken(token as string,envVars.JWT_ACCESS_SECRET) as JwtPayload

  const verifiedToken = req.user
  const payload = req.body
  const user = await UserServices.updateUser(userId, payload, verifiedToken as JwtPayload)
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    massage: "User Updated Successfully",
    data: user
  })

})

const getAllUsers = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

  const query = req.query;
  const result = await UserServices.getAllUsers(query as Record<string, string>)

 sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        massage: "All Users Retrieved Successfully",
        data: result.data,
        meta: result.meta
    })

})

const getMe = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const decodedToken = req.user as JwtPayload
    const result = await UserServices.getMe(decodedToken.userId);

    // res.status(httpStatus.OK).json({
    //     success: true,
    //     message: "All Users Retrieved Successfully",
    //     data: users
    // })
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        massage: "Your profile Retrieved Successfully",
        data: result.data
    })
})

const getSingleUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const result = await UserServices.getSingleUser(id);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        massage: "User Retrieved Successfully",
        data: result.data
    })
})


export const UserControllers = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  getMe
}