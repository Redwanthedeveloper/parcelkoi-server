import winston from 'winston';
import expressWinston from 'express-winston';
import winstonMongo from 'winston-mongodb';
import winstonFile from 'winston-daily-rotate-file';
import { ElasticsearchTransport } from 'winston-elasticsearch';

// LOGGER MESSAGE
const getLogMessage = (req, res) => {
  const obj = {
    correlationId: req.headers['x-correlation-id'],
    requestBody: req.body,
  };
  return JSON.stringify(obj);
};

// ERROR TRANSPORTER MONGODB
const mongoErrorTransport = (uri) =>
  new winston.transports.MongoDB({
    db: uri,
    metaKey: 'meta',
  });

// INFO LOGGER
export const infoLogger = () =>
  expressWinston.logger({
    transports: [
      new winston.transports.Console(),
      new winston.transports.DailyRotateFile({
        filename: 'log-info-%DATE%.log',
        datePattern: 'YYYY-MM-DD-HH',
      }),
    ],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.json()
    ),
    meta: false,
    msg: getLogMessage,
  });

// ERROR LOGGER
export const errorLogger = (uri) =>
  expressWinston.errorLogger({
    transports: [
      new winston.transports.Console(),
      new winston.transports.DailyRotateFile({
        filename: 'log-error-%DATE%.log',
        datePattern: 'YYYY-MM-DD-HH',
      }),
      mongoErrorTransport(uri),
    ],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.json()
    ),
    meta: true,
    msg: '{ "correlationId": "{{req.headers["x-correlation-id"]}}", "error": "{{err.message}}" }',
  });
