import app from './app';
import { errorLogger } from './logger';
import { connectDb, uri } from './mongo';

const port = 5000;

app.listen(port, () => {
  connectDb();
  if (process.env.ENVIRONMENT != 'TEST') {
    // ERROR LOGGER
    app.use(errorLogger(uri));
  }

  console.log(`App is running on port ${port}`);
});
