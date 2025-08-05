"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlerZodError = void 0;
const handlerZodError = (err) => {
    const errorSources = [];
    err.issues.forEach((issue) => {
        errorSources.push({
            //path : "nickname iside lastname inside name"
            // path: issue.path.length > 1 && issue.path.reverse().join(" inside "),
            path: issue.path[issue.path.length - 1],
            message: issue.message
        });
    });
    return {
        statusCode: 400,
        message: "Zod Error",
        errorSources
    };
};
exports.handlerZodError = handlerZodError;
