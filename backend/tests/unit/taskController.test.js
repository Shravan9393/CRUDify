import { jest } from '@jest/globals';
import { createTask, getTask, updateTask, deleteTask } from '../../../backend/src/controllers/taskController.js';
import Task from '../../../backend/src/models/task.js';

jest.mock('../../../backend/src/models/task.js');

describe('Task Controller Unit Tests', () => {
  let req, res, next;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
    jest.clearAllMocks();
  });

  describe('createTask', () => {
    it('should create a new task and return 201 status', async () => {
      req.body = { title: 'Test Task' };
      const savedTask = { _id: '1', title: 'Test Task' };
      Task.prototype.save = jest.fn().mockResolvedValue(savedTask);

      await createTask(req, res, next);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(savedTask);
    });

    it('should return 500 status on error', async () => {
      req.body = { title: 'Test Task' };
      Task.prototype.save = jest.fn().mockRejectedValue(new Error('Save error'));

      await createTask(req, res, next);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Save error' });
    });
  });

  describe('getTask', () => {
    it('should return all tasks with 200 status', async () => {
      const tasks = [{ _id: '1', title: 'Task 1' }];
      Task.find = jest.fn().mockResolvedValue(tasks);

      await getTask(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(tasks);
    });

    it('should return 500 status on error', async () => {
      Task.find = jest.fn().mockRejectedValue(new Error('Find error'));

      await getTask(req, res, next);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Find error' });
    });
  });

  describe('updateTask', () => {
    it('should update a task and return 200 status', async () => {
      req.params = { id: '1' };
      req.body = { title: 'Updated Task' };
      const updatedTask = { _id: '1', title: 'Updated Task' };
      Task.findByIdAndUpdate = jest.fn().mockResolvedValue(updatedTask);

      await updateTask(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(updatedTask);
    });

    it('should return 404 if task not found', async () => {
      req.params = { id: '1' };
      req.body = { title: 'Updated Task' };
      Task.findByIdAndUpdate = jest.fn().mockResolvedValue(null);

      await updateTask(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Task not found' });
    });

    it('should return 500 status on error', async () => {
      req.params = { id: '1' };
      req.body = { title: 'Updated Task' };
      Task.findByIdAndUpdate = jest.fn().mockRejectedValue(new Error('Update error'));

      await updateTask(req, res, next);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Update error' });
    });
  });

  describe('deleteTask', () => {
    it('should delete a task and return 200 status', async () => {
      req.params = { id: '1' };
      Task.findByIdAndDelete = jest.fn().mockResolvedValue({ _id: '1' });

      await deleteTask(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Task Deleted' });
    });

    it('should return 404 if task not found', async () => {
      req.params = { id: '1' };
      Task.findByIdAndDelete = jest.fn().mockResolvedValue(null);

      await deleteTask(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Task not found' });
    });

    it('should return 500 status on error', async () => {
      req.params = { id: '1' };
      Task.findByIdAndDelete = jest.fn().mockRejectedValue(new Error('Delete error'));

      await deleteTask(req, res, next);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Delete error' });
    });
  });
});
