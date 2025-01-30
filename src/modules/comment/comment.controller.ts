import { Request, RequestHandler, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { commentService } from "./comment.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const createComment: RequestHandler = catchAsync(async (req: Request, res: Response) => {
    const commentData = req.body;
    const result = await commentService.createCommentIntoDB(commentData);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Comment create successfully",
        data: result
    })
});

export const commentController = {
    createComment,
};