import mongoose from 'mongoose';

export const uri = 'mongodb://localhost:27017/parcelkoi';
const options = { useUnifiedTopology: true };

export const connectDb = () => {
  mongoose.connect(uri, options, (err, db) => {
    if (err) {
      console.error(err);
    } else {
      console.log('DB connection established');
    }
  });
};
