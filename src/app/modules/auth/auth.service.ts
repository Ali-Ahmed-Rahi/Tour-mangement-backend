/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { IUser } from "../user/user.interface"
import httpStatus from "http-status-codes"
import { User } from "../user/user.model";
import AppError from "../../errorHelpers/AppError";
import bcryptjs from "bcryptjs";
import { envVars } from "../../config/env";
import { createNewAccessTokenWithRefreshToken, createUserTokens } from "../../utils/usertoken";
import { JwtPayload } from "jsonwebtoken";

// const credentialsLogin = async (payload: Partial<IUser>) => {
//   const { email, password } = payload;

//   const isUserExist = await User.findOne({ email })


//   if (!isUserExist) {
//     throw new AppError(httpStatus.BAD_REQUEST, "Email Does not Exist")
//   }


//   const isPasswordMatched = await bcryptjs.compare(password as string, isUserExist.password as string)

//   if (!isPasswordMatched) {
//     throw new AppError(httpStatus.BAD_REQUEST, "Incorrect Password")
//   }


//   const userTokens = createUserTokens(isUserExist)


//   const { password: pass, ...rest } = isUserExist.toObject()

//   return {
//     accessToken: userTokens.accessToken,
//     refreshToken: userTokens.refreshToken,
//     user: rest
//   }

// }


// get auth service

const getNewAccessToken = async (refreshToken: string) => {

  const newAccessToken = await createNewAccessTokenWithRefreshToken(refreshToken)

  return {
    accessToken: newAccessToken
  }

}

// reset Password
const resetPassword = async (oldPassword: string, newPassword: string, decodedToken: JwtPayload) => {

  const user = await User.findById(decodedToken.userId)

  const isOldPasswordMatch = await bcryptjs.compare(oldPassword, user!.password as string)

  if (!isOldPasswordMatch) {
    throw new AppError(httpStatus.UNAUTHORIZED, "old Password Does not Match")
  }

  user!.password = await bcryptjs.hash(newPassword, Number(envVars.BCRYPT_SALT_ROUND))

  user!.save()


}

export const AuthServices = {
  // credentialsLogin,
  getNewAccessToken,
  resetPassword


}