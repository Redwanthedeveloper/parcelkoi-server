import express from 'express';
import mongoose from 'mongoose';
import models from './models/index.js';
const port = 5000;
const app = express();

app.use(express.json());

const log = (msg) => {
  console.log(msg);
};

const uri =
  'mongodb+srv://redwanul79:Inayem79@cluster0.s0z6u.mongodb.net/parcelkoi?retryWrites=true&w=majority';
const options = {};

const connectDb = () => {
  mongoose.connect(uri, options, (err, db) => {
    if (err) {
      console.error(err);
    } else {
      console.log('DB connection established');
    }
  });
};

connectDb();

app.get('/', (req, res) => {
  res.send('Welcome to production api');
});

app.post('/', (req, res) => {
  const body = req.body;
  const user = new models.User({
    username: body.username,
  });

  user
    .save()
    .then((result) => {
      res.status(201).send('User saved is ' + result._id);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});

log(models);
