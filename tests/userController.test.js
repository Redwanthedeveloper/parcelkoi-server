import request from 'supertest';
import app from '../src/app';

jest.mock('../src/services/userService.js');

describe('UserController Test Suite', () => {
  test('get should return an array of users', async () => {
    let response = await request(app).get('/users');
    expect(response.statusCode).toBe(200);
    let users = response.body;
    expect(users.length).toBeGreaterThan(0);
    expect(users[0]._id).toBe('1');
  });

  test.only('post should return saved id', async () => {
    let user = { username: 'test002' };
    let response = await request(app).post('/users').send(user);
    expect(response.statusCode).toBe(201);
    let id = response.body;
    expect(id.length).toBe(24);
  });
});
