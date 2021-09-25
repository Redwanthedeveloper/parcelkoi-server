import mongoose from 'mongoose';

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

export default connectDb;
