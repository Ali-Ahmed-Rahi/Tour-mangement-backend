import { Request, Response } from "express";

import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sandResponse";
import { DivisionService } from "./division.service";

const createDivision = catchAsync(async (req: Request, res: Response) => {
  const result = await DivisionService.createDivision(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    massage: "Division created",
    data: result,
  });
});

const getAllDivisions = catchAsync(async (req: Request, res: Response) => {
  const result = await DivisionService.getAllDivisions();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    massage: "Divisions retrieved",
    data: result.data,
    meta: result.meta,
  });
});


const getSingleDivision = catchAsync(async (req: Request, res: Response) => {
  const slug = req.params.slug
  const result = await DivisionService.getSingleDivision(slug);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    massage: "Divisions retrieved",
    data: result.data,
  });
});

const updateDivision = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await DivisionService.updateDivision(id, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    massage: "Division updated",
    data: result,
  });
});

const deleteDivision = catchAsync(async (req: Request, res: Response) => {
  const result = await DivisionService.deleteDivision(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    massage: "Division deleted",
    data: result,
  });
});

export const DivisionController = {
  createDivision,
  getAllDivisions,
  getSingleDivision,
  updateDivision,
  deleteDivision,
};

// Object literal may only specify known properties, but 'message' does not exist in type 'TResponse<unknown>'. Did you mean to write 'massage'?