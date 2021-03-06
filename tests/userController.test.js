import request from 'supertest';
import app from '../src/app';

jest.mock('../src/services/userService.js');

describe('UserController Test Suite', () => {
  test('get should return an array of users', async () => {
    let response = await request(app).get('/users');
    expect(response.statusCode).toBe(200);
    let users = response.body;
    expect(users.length).toBeGreaterThan(0);
    expect(users[0].id).toBe('1');
  });

  test('post should return saved id', async () => {
    let user = { username: 'test002' };
    let response = await request(app).post('/users').send(user);
    expect(response.statusCode).toBe(201);
    let id = response.body;
    expect(id.length).toBe(24);
    let savedUserResponse = await request(app).get('/users/' + id);
    let savedUser = savedUserResponse.body;
    expect(savedUser.username).toBe(user.username);
  });

  test('put should update an existing user', async () => {
    let user = { id: '1', username: 'test005' };
    let response = await request(app).put('/users').send(user);
    expect(response.statusCode).toBe(200);
    let updateduserResponse = await request(app).get('/users/1');
    let updatedUser = updateduserResponse.body;
    expect(updatedUser.username).toBe(user.username);
  });

  test('delete by id should return a success message', async () => {
    let response = await request(app).delete('/users/1');
    expect(response.statusCode).toBe(200);
    let deletedUserResponse = await request(app).get('/users/1');
    expect(deletedUserResponse.statusCode).toBe(404);
    let deletedUser = deletedUserResponse.body;
    expect(deletedUser.message).toBe('User not found by the id: 1');
  });
});
