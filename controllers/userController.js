import express from 'express';
import {
  getAllUsers,
  saveUser,
  updateUser,
  deleteById,
} from '../services/userService';

const router = express();

const getHandler = async (req, res) => {
  const users = await getAllUsers();
  res.status(200).send(users);
};

const postHandler = async (req, res) => {
  const body = req.body;
  const user = await saveUser(body);
  res.status(200).send(user._id);
};

const putHandler = async (req, res) => {
  const body = req.body;
  const user = await updateUser(body);
  res.status(200).send(user);
};

const deleteHandler = async (req, res) => {
  const id = req.params.id;
  const result = await deleteById(id);
  if (result instanceof Error) {
    res.status(404).send(result.message);
  } else {
    res.status(200).send('user deleted');
  }
};

router.get('/', getHandler);
router.post('/', postHandler);
router.put('/', putHandler);
router.delete('/:id', deleteHandler);

const configure = (app) => {
  app.use('/users', router);
};

export default configure;