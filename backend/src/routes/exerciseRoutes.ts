import express from 'express';
import { ExerciseController } from '../controllers';
import { ExerciseClient } from '../clients/exerciseClient'; // Ensure the correct client is imported
/**
 * @swagger
 * tags:
 *   name: Exercises
 *   description: API endpoints for managing exercises.
 */

export function createExerciseRouter(
  exerciseClient: ExerciseClient,
): express.Router {
  const exerciseController = new ExerciseController(exerciseClient);
  const router = express.Router();

  /**
   * @swagger
   * /exercises/all:
   *   get:
   *     summary: Get all exercises.
   *     tags: [Exercises]
   *     responses:
   *       200:
   *         description: A list of exercises. Note that the schema may be Email (as shown below) or the Text schema found under "Schemas".
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Email'
   *       404:
   *         description: No exercises found.
   */
  router.get('/all', exerciseController.getAllExercises);
  /**
   * @swagger
   * /exercises/random:
   *   get:
   *     summary: Get a random exercise.
   *     tags: [Exercises]
   *     responses:
   *       200:
   *         description: A single random exercise. Note that the schema may be Email (as shown below) or the Text schema found under "Schemas".
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Email'
   *       404:
   *         description: No exercises found.
   */

  router.get('/random', exerciseController.getRandomExercise);

  /**
   * @swagger
   *  /exercises:
   *   get:
   *     summary: Get a specified number of random exercises.
   *     tags: [Exercises]
   *     parameters:
   *       - in: query
   *         name: count
   *         schema:
   *           type: integer
   *           default: 10
   *         description: Number of random exercises to retrieve. Note that the schema may be Email (as shown below) or the Text schema found under "Schemas".
   *     responses:
   *       200:
   *         description: A list of random exercises.
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Email'
   *       404:
   *         description: No exercises found.
   */

  router.get('/', exerciseController.getRandomExercises);

  return router;
}
