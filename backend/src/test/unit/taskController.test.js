import { jest } from '@jest/globals';
import { createTask } from "../../controllers/taskController.js";
import Task from "../../models/task.js";

jest.mock("../../models/task.js");

test("should create a task successfully", async () => {
  Task.prototype.save = jest
    .fn()
    .mockResolvedValue({ title: "Test", description: "Test desc" });

  const req = { body: { title: "Test", description: "Test desc" } };
  const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

  await createTask(req, res);

  expect(res.status).toHaveBeenCalledWith(201);
  expect(res.json).toHaveBeenCalledWith({
    title: "Test",
    description: "Test desc",
  });
});
