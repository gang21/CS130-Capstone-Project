import express from 'express';
import multer from 'multer';
import { ResourceController } from '../controllers';
import type { ResourceClient } from '../clients/resourceClient';

const upload = multer();

/**
 * @swagger
 * tags:
 *   name: Resources
 *   description: API for managing scam resource information
 */

export function createResourceRouter(
  resourceClient: ResourceClient,
): express.Router {
  const resourceController = new ResourceController(resourceClient);
  const router = express.Router();

  /**
   * @swagger
   * /resources/all:
   *   get:
   *     summary: Get all resources.
   *     tags: [Resources]
   *     responses:
   *       200:
   *         description: A list of resources.
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/ResourceDocument'
   */
  router.get('/all', resourceController.getAll);

  /**
   * @swagger
   * /resources:
   *   post:
   *     summary: Create a new resource.
   *     tags: [Resources]
   *     requestBody:
   *       required: true
   *       content:
   *         multipart/form-data:
   *           schema:
   *             type: object
   *             properties:
   *               category:
   *                 type: string
   *                 description: Category of the scam resource (e.g., Phishing, Malware)
   *                 required: true
   *               content:
   *                 type: string
   *                 description: Description of the scam and its techniques
   *                 required: true
   *               links:
   *                 type: array
   *                 description: Array of URLs containing relevant information on the scam
   *                 items:
   *                   type: string
   *                   format: uri
   *                 required: true
   *               image:
   *                 type: string
   *                 description: Base64 encoded image data (optional)
   *     responses:
   *       201:
   *         description: The newly created resource object.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ResourceDocument'
   */
  router.post('/', upload.single('image'), resourceController.create);

  return router;
}
