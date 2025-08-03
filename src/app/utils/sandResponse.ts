import { Response } from "express"


interface TMeta {
    page: number;
    limit: number;
    totalPage: number;
    total: number
}

interface TResponse<T> {
  statusCode: number;
  success: boolean;
  massage: string;
  data: T;
  meta?:TMeta
}

export const sendResponse = <T>(res: Response, data: TResponse<T>) => {
  res.status(data.statusCode).json({
    StatusCode: data.statusCode,
    success:data.success,
    message:data.massage,
    meta:data.meta,
    data:data.data
  })
}