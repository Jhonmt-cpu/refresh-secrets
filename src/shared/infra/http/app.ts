import express, { NextFunction, Request, Response } from 'express';
import { errors } from 'celebrate';
import rateLimiter from './middlewares/rateLimiter';
import { router } from './routes';
import { AppError } from '../../errors/AppError';

import '../../container';

const app = express();

app.use(express.json());

app.use(rateLimiter);

app.use(router);

app.use(errors());

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
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
