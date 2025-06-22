import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../../../backend/src/index.js';
import Task from '../../../backend/src/models/task.js';

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  await Task.deleteMany({});
});

describe('Task API Endpoints', () => {
  it('POST /api/tasks - should create a new task', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .send({ title: 'API Test Task' });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.title).toBe('API Test Task');
  });

  it('GET /api/tasks - should get all tasks', async () => {
    await Task.create({ title: 'Task 1' });
    await Task.create({ title: 'Task 2' });

    const res = await request(app).get('/api/tasks');
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBe(2);
  });

  it('PUT /api/tasks/:id - should update a task', async () => {
    const task = await Task.create({ title: 'Old Title' });

    const res = await request(app)
      .put(`/api/tasks/${task._id}`)
      .send({ title: 'Updated Title' });

    expect(res.statusCode).toEqual(200);
    expect(res.body.title).toBe('Updated Title');
  });

  it('DELETE /api/tasks/:id - should delete a task', async () => {
    const task = await Task.create({ title: 'To be deleted' });

    const res = await request(app).delete(`/api/tasks/${task._id}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Task Deleted');
  });
});
