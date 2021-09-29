import models from '../../models';

let users = [
  {
    _id: '1',
    username: 'test01',
  },
];

export const getAllUsers = async () => {
  return users;
};

export const saveUser = async (user) => {
  const model = new models.User(user);
  users.push(model);
  return model;
};
