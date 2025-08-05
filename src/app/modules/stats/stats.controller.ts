// controllers/stats.controller.ts
import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sandResponse";
import { StatsService } from "./stats.service";

const getBookingStats = catchAsync(async (req: Request, res: Response) => {
    const stats = await StatsService.getBookingStats();
    sendResponse(res, {
        statusCode: 200,
        success: true,
        massage: "Booking stats fetched successfully",
        data: stats,
    });
});

const getPaymentStats = catchAsync(async (req: Request, res: Response) => {
    const stats = await StatsService.getPaymentStats();
    sendResponse(res, {
        statusCode: 200,
        success: true,
        massage: "Payment stats fetched successfully",
        data: stats,
    });
});

const getUserStats = catchAsync(async (req: Request, res: Response) => {
    const stats = await StatsService.getUserStats();
    sendResponse(res, {
        statusCode: 200,
        success: true,
        massage: "User stats fetched successfully",
        data: stats,
    });
});

const getTourStats = catchAsync(async (req: Request, res: Response) => {
    const stats = await StatsService.getTourStats();
    sendResponse(res, {
        statusCode: 200,
        success: true,
        massage: "Tour stats fetched successfully",
        data: stats,
    });
});

export const StatsController = {
    getBookingStats,
    getPaymentStats,
    getUserStats,
    getTourStats,
};