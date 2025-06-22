import mongoose from "mongoose";
import request from "supertest";
import app from "../../index.js"; // export `app` from index.js
import { MongoMemoryServer } from "mongodb-memory-server";

let mongo;

beforeAll(async () => {
  mongo = await MongoMemoryServer.create();
  await mongoose.connect(mongo.getUri(), { dbName: "test" });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongo.stop();
});

test("POST /api/tasks should create a task", async () => {
  const res = await request(app)
    .post("/api/tasks")
    .send({ title: "Test", description: "desc" });

  expect(res.statusCode).toBe(201);
  expect(res.body.title).toBe("Test");
});
