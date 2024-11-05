import { Resource } from "@shared_types";
import { InsertOneResultWithoutId, decodeHex, encodeHex } from "../utils";
import { ResourceClient } from "../clients";
import { InsertOneResult } from "mongodb";
import { Request, NextFunction, Response } from "express";

export class ResourceController {
  constructor(private readonly client: ResourceClient) {}

  getAll = async (
    _: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const exercises = await this.client.getAll();
      if (!exercises) {
        res.status(404).json({ error: "Resources not found" });
        return;
      }
      res.json(exercises);
      return;
    } catch (error) {
      next(error); // Passes errors to the error-handling middleware
    }
  };

  getById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const decodedId = decodeHex(id);
      if (!decodedId) {
        res.status(400).json({ error: "Invalid ID format" });
        return;
      }

      const resource = await this.client.getById(decodedId);
      if (!resource) {
        res.status(404).json({ error: "Resource not found" });
        return;
      }

      res.json({ ...resource, _id: encodeHex(resource._id) });
    } catch (error) {
      next(error);
    }
  };

  create = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { resource } = req.body;
      console.log("body", resource);
      const createdResource: InsertOneResult = await this.client.create(
        resource
      );
      res.json({
        ...createdResource,
        insertedId: encodeHex(createdResource.insertedId),
      });
    } catch (error) {
      next(error);
    }
  };

  update = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const decodedId = decodeHex(id);
      if (!decodedId) {
        res.status(400).json({ error: "Invalid resource ID" });
        return;
      }

      const resourceUpdates: Partial<Resource> = req.body;
      const existingResource = await this.client.getById(decodedId);

      if (!existingResource) {
        res.status(404).json({ error: "Resource not found" });
        return;
      }

      const updatedResource = await this.client.update(decodedId, {
        ...resourceUpdates,
        _id: decodedId,
      });

      if (!updatedResource) {
        res.status(500).json({ error: "Failed to update resource" });
        return;
      }

      res.json({ ...updatedResource, _id: encodeHex(updatedResource._id) });
    } catch (error) {
      next(error);
    }
  };
}
