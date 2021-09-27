import express from 'express';
import configure from './controllers';
import { handleErrors } from './middlewares/handleErrors';
import { connectDb, uri } from './mongo';
import winston from 'winston';
import expressWinston from 'express-winston';
import winstonMongo from 'winston-mongodb';
import winstonFile from 'winston-daily-rotate-file';
import { ElasticsearchTransport } from 'winston-elasticsearch';

const port = 5000;
const app = express();

app.use(express.json());

const processRequest = async (req, res, next) => {
  let correlationId = req.headers['x-correlation-id'];
  if (!correlationId) {
    correlationId = Date.now().toString();
    req.headers['x-correlation-id'] = correlationId;
  }
  res.set('x-correlation-id', correlationId);
  return next();
};

app.use(processRequest);

connectDb();

// LOGGER MESSAGE
const getLogMessage = (req, res) => {
  const obj = {
    correlationId: req.headers['x-correlation-id'],
    requestBody: req.body,
  };
  return JSON.stringify(obj);
};

// INFO TRANSPORTER FILE
const fileInfoTransport = new winston.transports.DailyRotateFile({
  filename: 'log-info-%DATE%.log',
  datePattern: 'YYYY-MM-DD-HH',
});

// ERROR TRANSPORTER FILE
const fileErrorTransport = new winston.transports.DailyRotateFile({
  filename: 'log-error-%DATE%.log',
  datePattern: 'YYYY-MM-DD-HH',
});

// ERROR TRANSPORTER MONGODB
const mongoErrorTransport = new winston.transports.MongoDB({
  db: uri,
  metaKey: 'meta',
});



// INFO LOGGER
const infoLogger = expressWinston.logger({
  transports: [
    new winston.transports.Console(),
    fileInfoTransport,
  ],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json()
  ),
  meta: false,
  msg: getLogMessage,
});

// ERROR LOGGER
const errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.Console(),
    fileErrorTransport,
    mongoErrorTransport,
  ],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json()
  ),
  meta: true,
  msg: '{ "correlationId": "{{req.headers["x-correlation-id"]}}", "error": "{{err.message}}" }',
});

// INFO LOGGER MIDDLEWARE
app.use(infoLogger);

configure(app);

// ERROR LOGGER MIDDLEWARE
app.use(errorLogger);

app.use(handleErrors);

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
