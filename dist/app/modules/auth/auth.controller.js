"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthControllers = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const sandResponse_1 = require("../../utils/sandResponse");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const auth_service_1 = require("./auth.service");
const AppError_1 = __importDefault(require("../../errorHelpers/AppError"));
const setcookies_1 = require("../../utils/setcookies");
const usertoken_1 = require("../../utils/usertoken");
const env_1 = require("../../config/env");
const passport_1 = __importDefault(require("passport"));
const credentialsLogin = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // const loginInfo = await AuthServices.credentialsLogin(req.body)
    passport_1.default.authenticate("local", (err, user, info) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            return next(new AppError_1.default(401, err));
        }
        if (!user) {
            // console.log("from !user");
            // return new AppError(401, info.message)
            return next(new AppError_1.default(401, info.message));
        }
        const userTokens = yield (0, usertoken_1.createUserTokens)(user);
        // delete user.toObject().password
        const _a = user.toObject(), { password: pass } = _a, rest = __rest(_a, ["password"]);
        (0, setcookies_1.setAuthCookie)(res, userTokens);
        (0, sandResponse_1.sendResponse)(res, {
            success: true,
            statusCode: http_status_codes_1.default.OK,
            massage: "User Logged In Successfully",
            data: {
                accessToken: userTokens.accessToken,
                refreshToken: userTokens.refreshToken,
                user: rest
            },
        });
    }))(req, res, next);
    // res.cookie("accessToken", loginInfo.accessToken, {
    //     httpOnly: true,
    //     secure: false
    // })
    // res.cookie("refreshToken", loginInfo.refreshToken, {
    //     httpOnly: true,
    //     secure: false,
    // })
}));
// get new access token
const getNewAccessToken = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "No Refresh Token Received from cookies");
    }
    const tokenInfo = yield auth_service_1.AuthServices.getNewAccessToken(refreshToken);
    (0, setcookies_1.setAuthCookie)(res, tokenInfo);
    (0, sandResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        massage: "New Access token retrieved Successfully",
        data: tokenInfo
    });
}));
// logout
const logout = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.clearCookie("accessToken", {
        httpOnly: true,
        secure: false,
        sameSite: 'lax'
    });
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: false,
        sameSite: 'lax'
    });
    (0, sandResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        massage: "User Logout Successfully",
        data: null
    });
}));
// change password
const changePassword = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const newPassword = req.body.newPassword;
    const oldPassword = req.body.oldPassword;
    const decodedToken = req.user;
    yield auth_service_1.AuthServices.changePassword(oldPassword, newPassword, decodedToken);
    (0, sandResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        massage: "Password Changed Successfully",
        data: null,
    });
}));
// resetPassword
const resetPassword = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const decodedToken = req.user;
    yield auth_service_1.AuthServices.resetPassword(req.body, decodedToken);
    (0, sandResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        massage: "Password Changed Successfully",
        data: null,
    });
}));
// set password
const setPassword = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const decodedToken = req.user;
    const { password } = req.body;
    yield auth_service_1.AuthServices.setPassword(decodedToken.userId, password);
    (0, sandResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        massage: "Password Changed Successfully",
        data: null,
    });
}));
// forgot  password
const forgotPassword = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    yield auth_service_1.AuthServices.forgotPassword(email);
    (0, sandResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        massage: "Email Sent Successfully",
        data: null,
    });
}));
// google callback
const googleCallbackController = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let redirectTo = req.query.state ? req.query.state : "";
    if (redirectTo.startsWith("/")) {
        redirectTo = redirectTo.slice(1);
    }
    const user = req.user;
    // console.log("this is user used to google", user);
    if (!user) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "user not found");
    }
    const tokenInfo = (0, usertoken_1.createUserTokens)(user);
    (0, setcookies_1.setAuthCookie)(res, tokenInfo);
    res.redirect(`${env_1.envVars.FRONTEND_URL}/${redirectTo}`);
}));
exports.AuthControllers = {
    credentialsLogin,
    getNewAccessToken,
    logout,
    resetPassword,
    setPassword,
    changePassword,
    forgotPassword,
    googleCallbackController
};
