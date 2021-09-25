import express from 'express';
import configure from './controllers';
import connectDb from './mongo';

const port = 5000;
const app = express();

app.use(express.json());

connectDb();

configure(app);

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
