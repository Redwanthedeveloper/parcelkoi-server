import express from 'express';
import configure from './controllers';
import { handleErrors } from './middlewares/handleErrors';
import connectDb from './mongo';

const port = 5000;
const app = express();

app.use(express.json());

connectDb();

configure(app);

app.use(handleErrors);

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
