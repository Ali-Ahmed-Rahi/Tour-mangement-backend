/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express"
import { catchAsync } from "../../utils/catchAsync"
import { sendResponse } from "../../utils/sandResponse"
import httpStatus from "http-status-codes"
import { AuthServices } from "./auth.service"
import AppError from "../../errorHelpers/AppError"
import { setAuthCookie } from "../../utils/setcookies"
import { createUserTokens } from "../../utils/usertoken"
import { envVars } from "../../config/env"
import { JwtPayload } from "jsonwebtoken"

const credentialsLogin=catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const loginInfo=await AuthServices.credentialsLogin(req.body)
  
  setAuthCookie(res,loginInfo)


  sendResponse(res,{
    success:true,
    statusCode:httpStatus.OK,
    massage:"User Logged in Created Successfully",
    data:loginInfo
  })

})

// get new access token
const getNewAccessToken=catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const refreshToken=req.cookies.refreshToken;
  if (!refreshToken) {
    throw new AppError(httpStatus.BAD_REQUEST,"No Refresh Token Received from cookies")
  }
  const tokenInfo= await AuthServices.getNewAccessToken(refreshToken as string)

setAuthCookie(res,tokenInfo)

  sendResponse(res,{
    success:true,
    statusCode:httpStatus.OK,
    massage:"New Access token retrieved Successfully",
    data:tokenInfo
  })

})

// logout
const logout=catchAsync(async (req: Request, res: Response, next: NextFunction) => {

   res.clearCookie("accessToken",{
    httpOnly:true,
    secure:false,
    sameSite:'lax'
   })

   res.clearCookie("refreshToken",{
    httpOnly:true,
    secure:false,
    sameSite:'lax'
   })

  sendResponse(res,{
    success:true,
    statusCode:httpStatus.OK,
    massage:"User Logout Successfully",
    data:null
  })

})

// password change
const resetPassword=catchAsync(async (req: Request, res: Response, next: NextFunction) => {


  const newPassword=req.body.newPassword;
  const oldPassword=req.body.oldPassword;
  const decodedToken=req.user

 await AuthServices.resetPassword(oldPassword,newPassword,decodedToken as JwtPayload)


  sendResponse(res,{
    success:true,
    statusCode:httpStatus.OK,
    massage:"Password changed Successfully",
    data:null
  })

})



// google callback
const googleCallbackController=catchAsync(async (req: Request, res: Response, next: NextFunction) => {

  let redirectTo=req.query.state ? req.query.state as string : "" 

  if (redirectTo.startsWith("/")) {
    redirectTo=redirectTo.slice(1)
  }

  const user=req.user
  console.log("this is user used to google",user);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND,"user not found")
  }
  const tokenInfo= createUserTokens(user)

  setAuthCookie(res,tokenInfo)


 res.redirect(`${envVars.FRONTEND_URL}/${redirectTo}`)
})






export const AuthControllers={
  credentialsLogin,
  getNewAccessToken,
  logout,
  resetPassword,
  googleCallbackController
}
