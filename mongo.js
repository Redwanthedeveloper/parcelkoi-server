import mongoose from 'mongoose';

export const uri =
  'mongodb+srv://redwanul79:Inayem79@cluster0.s0z6u.mongodb.net/parcelkoi?retryWrites=true&w=majority';
const options = {};

export const connectDb = () => {
  mongoose.connect(uri, options, (err, db) => {
    if (err) {
      console.error(err);
    } else {
      console.log('DB connection established');
    }
  });
};
