import express from 'express';
import configure from './controllers';
import { handleErrors, processRequest } from './middlewares';
import { errorLogger, infoLogger } from './logger';
import dotenv from 'dotenv';
import { connectDb } from './mongo';
dotenv.config();

const app = express();
app.use(express.json());

console.log(process.env.USER);

app.use(processRequest);

connectDb();

// INFO LOGGER MIDDLEWARE
app.use(infoLogger);

// CONFIGURE ROUTES
configure(app);

// ERROR LOGGER
app.use(errorLogger);

// ERROR MIDDLEWARE
app.use(handleErrors);

export default app;
