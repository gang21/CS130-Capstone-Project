import express from 'express';
import { UserController } from '../controllers';
import { UserClient } from '../clients/userClient';

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API for managing users
 */

export function createUserRouter(userClient: UserClient): express.Router {
  const userController = new UserController(userClient);
  const router = express.Router();

  /**
   * @swagger
   * /users:
   *   get:
   *     summary: Retrieve all users
   *     description: Returns a list of all users.
   *     tags:
   *       - Users
   *     responses:
   *       200:
   *         description: A list of user objects.
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 type: object
   *                 properties:
   *                   _id:
   *                     type: string
   *                     description: The unique identifier for the user.
   *                     example: "8DKZvZ9Wv9Hk9WEzGbQN"
   *                   email:
   *                     type: string
   *                     description: The user's email address.
   *                     example: "gabriella90631@gmail.com"
   *                   password:
   *                     type: string
   *                     description: The user's hashed password.
   *                     example: "$2b$10$Uo5t0qVFHOTa1d13e4SD6eELcnVJfCGv5amK5SM3zB/QPt5H28U9W"
   *                   sub:
   *                     type: string
   *                     description: The user's subject identifier.
   *                     example: "$2b$10$jfc.GIURY"
   *                   username:
   *                     type: string
   *                     description: The user's chosen username.
   *                     example: "Gabriella"
   *                   graduated:
   *                     type: boolean
   *                     description: Indicates if the user has graduated.
   *                     example: false
   *                   overallScore:
   *                     type: integer
   *                     description: The user's cumulative score.
   *                     example: 410
   */
  router.get('/', userController.getAll);

  /**
   * @swagger
   * /users/{id}:
   *   get:
   *     summary: Retrieve a user by ID
   *     description: Returns a single user object by their unique ID.
   *     tags:
   *       - Users
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         description: Unique identifier of the user.
   *         schema:
   *           type: string
   *           example: "8DKZvZ9Wv9Hk9WEzGbQN"
   *     responses:
   *       200:
   *         description: A user object.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 _id:
   *                   type: string
   *                   example: "8DKZvZ9Wv9Hk9WEzGbQN"
   *                 email:
   *                   type: string
   *                   example: "gabriella90631@gmail.com"
   *                 password:
   *                   type: string
   *                   example: "$2b$10$Uo5t0qVFHOTa1d13e4SD6eELcnVJfCGv5amK5SM3zB/QPt5H28U9W"
   *                 sub:
   *                   type: string
   *                   example: "$2b$10$jfc.GIURY"
   *                 username:
   *                   type: string
   *                   example: "Gabriella"
   *                 graduated:
   *                   type: boolean
   *                   example: false
   *                 overallScore:
   *                   type: integer
   *                   example: 410
   *       404:
   *         description: User not found.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 error:
   *                   type: string
   *                   example: "User not found"
   */
  router.get('/:id', userController.getById);

  /**
   * @swagger
   * /users/{id}:
   *   put:
   *     summary: Update a user's score or other properties.
   *     description: Update a user's score or other properties. Note that the header must include a valid JWT, so this endpoint cannot be tested directly from the "Try it out" section of this API documentation.
   *     tags:
   *       - Users
   *     security:
   *       - BearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: The ID of the user to update.
   *         schema:
   *           type: string
   *           example: "8DKZvZ9Wv9Hk9WEzGbQN"
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               email:
   *                 type: string
   *                 description: The user's email address.
   *                 example: "newemail@example.com"
   *               username:
   *                 type: string
   *                 description: The user's chosen username.
   *                 example: "NewUsername"
   *               graduated:
   *                 type: boolean
   *                 description: Indicates if the user has graduated.
   *                 example: true
   *               overallScore:
   *                 type: integer
   *                 description: The user's updated score.
   *                 example: 500
   *             required:
   *               - email
   *               - username
   *               - graduated
   *               - overallScore
   *     responses:
   *       200:
   *         description: User updated successfully.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/User'
   *       400:
   *         description: Invalid request payload or parameters.
   *       401:
   *         description: Unauthorized request. Token missing or invalid.
   *       404:
   *         description: User not found.
   *       500:
   *         description: Internal server error.
   */
  router.put('/:id', userController.update);

  return router;
}
