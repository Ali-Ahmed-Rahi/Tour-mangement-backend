"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResponse = void 0;
const sendResponse = (res, data) => {
    res.status(data.statusCode).json({
        StatusCode: data.statusCode,
        success: data.success,
        message: data.massage,
        meta: data.meta,
        data: data.data
    });
};
exports.sendResponse = sendResponse;
