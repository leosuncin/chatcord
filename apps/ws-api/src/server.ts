import { createServer } from 'node:http';
import cors from 'cors';
import express, {
  json,
  urlencoded,
  Express,
  Request,
  Response,
  NextFunction,
} from 'express';
import { isHttpError } from 'http-errors';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { Server } from 'socket.io';
import pinoLogger from 'express-pino-logger';
import pino from 'pino';

import { env } from './config';

const transport = pino.transport({
  target: 'pino-http-print',
  options: {
    all: true,
    colorize: env.isDev,
    translateTime: true,
  },
});
export const logger = pino(transport);
export const app: Express = express();
export const server = createServer(app);
export const io = new Server(server);

function notFoundMiddleware(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  response.status(StatusCodes.NOT_FOUND).json({
    statusCode: StatusCodes.NOT_FOUND,
    error: ReasonPhrases.NOT_FOUND,
    message: `Cannot ${request.method} ${request.path}`,
  });

  next();
}

function errorMiddleware(
  error: unknown,
  _request: Request,
  response: Response,
  next: NextFunction,
) {
  if (isHttpError(error)) {
    response.status(error.status).json(error);
  } else if (error instanceof Error) {
    response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      statusCodes: StatusCodes.INTERNAL_SERVER_ERROR,
      error: ReasonPhrases.INTERNAL_SERVER_ERROR,
      message: error.message,
    });
  } else if (error) {
    response.status(StatusCodes.SERVICE_UNAVAILABLE).json({
      statusCodes: StatusCodes.SERVICE_UNAVAILABLE,
      error: ReasonPhrases.SERVICE_UNAVAILABLE,
      message: String(error),
    });
  }

  next();
}

app.use(
  json(),
  urlencoded({ extended: true }),
  cors({ origin: true }),
  // @ts-expect-error pino logger
  pinoLogger({ logger, enabled: !env.isTest }),
);
app.use(notFoundMiddleware, errorMiddleware);

if (require.main === module) {
  server.listen(env.PORT, () => {
    logger.info('Server is listening in http://localhost:%d', env.PORT);
  });
}
