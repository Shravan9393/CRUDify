import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
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

describe('Task Model Integration Tests', () => {
  it('should create and save a task successfully', async () => {
    const validTask = new Task({ title: 'Integration Test Task' });
    const savedTask = await validTask.save();

    expect(savedTask._id).toBeDefined();
    expect(savedTask.title).toBe('Integration Test Task');
    expect(savedTask.completed).toBe(false);
  });

  it('should retrieve tasks', async () => {
    const task1 = new Task({ title: 'Task 1' });
    const task2 = new Task({ title: 'Task 2' });
    await task1.save();
    await task2.save();

    const tasks = await Task.find();
    expect(tasks.length).toBe(2);
  });

  it('should update a task', async () => {
    const task = new Task({ title: 'Old Title' });
    await task.save();

    const updatedTask = await Task.findByIdAndUpdate(task._id, { title: 'New Title' }, { new: true });
    expect(updatedTask.title).toBe('New Title');
  });

  it('should delete a task', async () => {
    const task = new Task({ title: 'To be deleted' });
    await task.save();

    await Task.findByIdAndDelete(task._id);
    const deletedTask = await Task.findById(task._id);
    expect(deletedTask).toBeNull();
  });
});
