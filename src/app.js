import express from 'express';
import configure from './controllers';
import { handleErrors, processRequest } from './middlewares';
import { infoLogger } from './logger';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());

app.use(processRequest);

if (process.env.ENVIRONMENT !== 'TEST') {
  // INFO LOGGER MIDDLEWARE
  app.use(infoLogger());
}

// CONFIGURE ROUTES
configure(app);

// ERROR MIDDLEWARE
app.use(handleErrors);

export default app;
