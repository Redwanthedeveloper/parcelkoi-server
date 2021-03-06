import models from '../../models';

let users = [
  {
    id: '1',
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

export const getUserById = async (id) => {
  const user = users.find((x) => x.id === id);
  return user;
};

export const updateUser = async (user) => {
  users[0].username = user.username;
  return users[0];
};

export const deleteById = async (id) => {
  return users = [];
};
