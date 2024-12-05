import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PORT } from './settings';
import swaggerUi from 'swagger-ui-express';
import swaggerSpecs from './utils/swaggerConfig'; // Adjust the import path as needed

import { initializeClients } from './server/db';
import {
  createExerciseRouter,
  createResourceRouter,
  createSessionRouter,
  createUserRouter,
} from './routes';

dotenv.config();

const app = express();

// Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

initializeClients()
  .then(({ userClient, exerciseClient, resourceClient }) => {
    // Register routes with the appropriate clients and controllers
    app.use('/session', createSessionRouter(userClient));
    app.use('/users', createUserRouter(userClient)); // Example for User routes
    app.use('/exercises', createExerciseRouter(exerciseClient));
    app.use('/resources', createResourceRouter(resourceClient));
    app.listen(PORT || 4000, () => {
      console.log(`Server running on port ${PORT}...`);
      console.log(`Swagger UI available at http://localhost:${PORT}/api-docs`);
    });
  })
  .catch((error) => console.log('Error connecting to MongoDB:', error));

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
