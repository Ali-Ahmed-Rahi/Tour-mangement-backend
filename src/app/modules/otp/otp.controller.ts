import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sandResponse";
import { OTPService } from "./otp.service";


const sendOTP = catchAsync(async (req: Request, res: Response) => {
    const { email, name } = req.body
    await OTPService.sendOTP(email, name)
    sendResponse(res, {
        statusCode: 200,
        success: true,
        massage: "OTP sent successfully",
        data: null,
    });
})

const verifyOTP = catchAsync(async (req: Request, res: Response) => {
    const { email, otp } = req.body;
    await OTPService.verifyOTP(email, otp)
    sendResponse(res, {
        statusCode: 200,
        success: true,
        massage: "OTP verified successfully",
        data: null,
    });
})

export const OTPController = {
    sendOTP,
    verifyOTP
};