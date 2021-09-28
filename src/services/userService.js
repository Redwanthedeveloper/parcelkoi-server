import models from '../models';
import { NotFound } from '../utils/errors';

export const getAllUsers = async () => {
  const User = models.User;
  const users = await User.find();
  return users;
};

export const saveUser = async (user) => {
  const model = new models.User(user);
  const savedUser = await model.save();
  return savedUser;
};

export const updateUser = async (user) => {
  const id = user._id;
  const User = models.User;
  const model = await User.findById(id);
  if (model) {
    model.username = user.username;
    await model.save();
    return model;
  }
  throw new NotFound(`User not found by the id ${id}`);
};

export const deleteById = async (id) => {
  const User = models.User;
  const user = await User.findById(id);
  if (user) {
    const result = await user.deleteOne({ _id: id });
    return result;
  } else {
    throw new NotFound(`User not found by the id ${id}`);
  }
};
