import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { likeValidation } from "./like.validation";
import { likeController } from "./like.controller";
import auth from "../../middleware/auth";

const route = Router();

// API endpoint for like blog.
route.post("/like", auth("admin"), validateRequest(likeValidation.likeSchema), likeController.Like);

// API endpoint for unlike blog.
route.delete("/unlike/:id", auth("admin"), likeController.unLike);

// API endpoint for get all like.
route.get("/get-all-like", auth("admin"), likeController.getAllLike);

// API endpoint for delete like.
route.delete("/delete-like/:id", auth("admin"), likeController.deleteLike);

export const likeRoutes = route;