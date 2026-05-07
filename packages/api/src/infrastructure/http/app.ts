import express from 'express';
import helmet from 'helmet';
import nocache from 'nocache';
import createError from 'http-errors';
import cors from 'cors';
import { router } from '../../presentation';
import { ErrorHandler } from '../../application/utils/ErrorHandler';

export function createApp(): express.Application {
  const app = express();

  // Middleware
  app.use(
    cors({ origin: `*` }),
    helmet(),
    nocache(),
    express.json(),
    express.urlencoded({ extended: false }),
  );

  // Routes
  app.use(`/api`, router);

  // 404 handler
  app.use((req, res, next) => {
    next(createError(404, `Route not found: ${req.method} ${req.url}`));
  });

  // Error handler
  app.use(ErrorHandler);

  return app;
}
