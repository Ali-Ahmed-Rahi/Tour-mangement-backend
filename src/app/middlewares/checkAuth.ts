import { NextFunction, Request, Response } from "express"
import AppError from "../errorHelpers/AppError"
import { verifyToken } from "../utils/jwt"
import { envVars } from "../config/env"
import { JwtPayload } from "jsonwebtoken"
import { User } from "../modules/user/user.model"
import httpStatus from "http-status-codes"
import { IsActive } from "../modules/user/user.interface"

export const checkAuth = (...authRoles: string[]) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    const accessToken = req.headers.authorization

    if (!accessToken) {
      throw new AppError(403, "No Token Received")


    }
    const verifiedToken = verifyToken(accessToken, envVars.JWT_ACCESS_SECRET) as JwtPayload

    const isUserExist=await User.findOne({email:verifiedToken.email})
    
    
      if (!isUserExist) {
        throw new AppError(httpStatus.BAD_REQUEST,"User Does not Exist")
      }
      
      if (isUserExist.isVerified) {
        throw new AppError(httpStatus.BAD_REQUEST,"User Is not verified")
      }
      if (isUserExist.isActive === IsActive.BLOCKED || isUserExist.isActive === IsActive.INACTIVE) {
        throw new AppError(httpStatus.BAD_REQUEST,`User Is ${isUserExist.isActive}`)
      }
      
      if (isUserExist.isDeleted) {
        throw new AppError(httpStatus.BAD_REQUEST,"User Is Deleted")
      }
      
      

    if (!authRoles.includes(verifiedToken.role)) {
      throw new AppError(403, "You Are Not permitted to view this route")
    }

    req.user=verifiedToken

    next()


  } catch (error) {
    // eslint-disable-next-line no-console
    console.log("JWT ERROR")
    next(error)
  }
}