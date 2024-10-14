import express from "express";
import { SessionController } from "../controllers/sessionController";
import { UserClient } from "../clients/userClient"; // Ensure the correct client is imported
import { UserController } from "../controllers/userController";

export function createSessionRouter(userClient: UserClient): express.Router {
  const userController = new UserController(userClient);
  const sessionController = new SessionController(userClient, userController);
  const router = express.Router();

  router.post("/signup", sessionController.signup);
  router.post("/login", sessionController.login);
  router.get(
    "/checkUser",
    sessionController.verifyAuthAndAttachUser,
    sessionController.checkUser
  );

  return router;
}
