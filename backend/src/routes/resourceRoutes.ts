import express from "express";
import { ResourceController } from "../controllers";
import { ResourceClient } from "../clients/resourceClient";

export function createResourceRouter(
  resourceClient: ResourceClient
): express.Router {
  const resourceController = new ResourceController(resourceClient);
  const router = express.Router();

  router.get("/all", resourceController.getAll);
  router.post("/", resourceController.create);

  return router;
}
