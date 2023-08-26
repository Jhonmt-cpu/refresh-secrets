import 'reflect-metadata';
import 'dotenv/config';
import 'express-async-errors';
import express, { Request, Response } from 'express';
import { errors } from 'celebrate';
import { router } from './shared/routes/routes';
import { AppError } from './shared/errors/app-error';

const app = express();

app.use(express.json());

app.use(router);

app.use(errors());

app.use((err: Error, request: Request, response: Response) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.error(err);

  return response.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
  });
});

export { app };
