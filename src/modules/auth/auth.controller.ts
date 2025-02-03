import { Request, RequestHandler, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { authService } from "./auth.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import config from "../../config";

const verifyOtpForNewUser: RequestHandler = catchAsync(async (req: Request, res: Response) => {
    const { email, otp } = req.body;

    // Call the service method to verify OTP for new user in the database.
    const result = await authService.verifyOtpForNewUserIntoDB(email, otp);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Account Verify Successfully",
        data: result
    });
});

const signIn: RequestHandler = catchAsync(async (req: Request, res: Response) => {
    const loginData = req.body;

    // Call the service method to sign in user in the database.
    const result = await authService.signInIntoDB(loginData);

    if (result) {
        res.cookie('refreshToken', result?.refreshToken, {
            secure: config.node_env === 'production',
            httpOnly: true,
        });
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "User Login successfully!",
            data: result
        });
    }
});

export const authController = {
    verifyOtpForNewUser,
    signIn,
}