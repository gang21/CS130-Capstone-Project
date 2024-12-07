import express from 'express';
import { SessionController } from '../controllers/sessionController';
import { UserClient } from '../clients/userClient';
import { UserController } from '../controllers/userController';

/**
 * @swagger
 * tags:
 *   name: Session
 *   description: User session management endpoints
 */
export function createSessionRouter(userClient: UserClient): express.Router {
  const userController = new UserController(userClient);
  const sessionController = new SessionController(userController);
  const router = express.Router();

  /**
   * @swagger
   *   /signup:
   *     post:
   *       summary: Creates a new user account
   *       tags: [Session]
   *       requestBody:
   *         required: true
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 username:
   *                   type: string
   *                   description: Username for the new account
   *                 password:
   *                   type: string
   *                   description: Password for the new account
   *       responses:
   *         '201':
   *           description: User created successfully
   *           content:
   *             application/json:
   *               schema:
   *                 type: object
   *                 properties:
   *                   userId:
   *                     type: string
   *                     description: ID of the newly created user
   *         '400':
   *           description: Bad request (e.g., missing username or password)
   *         '409':
   *           description: Username already exists
   */
  router.post('/signup', sessionController.signup);

  /**
   * @swagger
   * /login:
   *   post:
   *     summary: Logs in a user and creates a session
   *     tags: [Session]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               username:
   *                 type: string
   *                 description: Username for login
   *               password:
   *                 type: string
   *                 description: Password for login
   *     responses:
   *       '200':
   *         description: User logged in successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 sessionId:
   *                   type: string
   *                   description: ID of the created session
   *       '401':
   *         description: Invalid username or password
   */
  router.post('/login', sessionController.login);

  /**
   * @swagger
   *   /checkUser:
   *     get:
   *       summary: Checks if a user is currently logged in and attaches user data
   *       tags: [Session]
   *       security:
   *         - bearerAuth: []
   *       responses:
   *         '200':
   *           description: User is logged in and user data is attached
   *           content:
   *             application/json:
   *               schema:
   *                 type: object
   *                 properties:
   *                   userId:
   *                     type: string
   *                     description: ID of the logged-in user
   *                   username:
   *                     type: string
   *                     description: Username of the logged-in user
   *         '401':
   *           description: User is not logged in
   */
  router.get(
    '/checkUser',
    sessionController.verifyAuthAndAttachUser,
    sessionController.checkUser,
  );

  return router;
}
