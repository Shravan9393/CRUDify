import Task from "../models/task.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import path from "path";
import mongoose from "mongoose";


//  Create a task

const createTask = asyncHandler(async (req, res) => {
  try {
    console.info("[CREATE] Incoming task data:", req.body);

    const task = new Task(req.body);
    const saved = await task.save();

    console.log("✅ Task created successfully:", saved);
    res.status(201).json(saved);
  } catch (error) {
    console.error("❌ Error creating task:", error);
    res.status(500).json({ error: error.message });
  }

});


//  Get all tasks
const getTask = asyncHandler(async (req, res) => {
  try {
    console.info("[GET] Fetching all tasks...");

    const tasks = await Task.find();

    console.log(`✅ Retrieved ${tasks.length} tasks.`);
    res.status(200).json(tasks);
  } catch (error) {
    console.error("❌ Error fetching tasks:", error);
    res.status(500).json({ error: error.message });
  }

});


// Update a task

const updateTask = asyncHandler(async (req, res) => {
  try {
    console.info(" [UPDATE] Task ID:", req.params.id);
    console.info(" New data:", req.body);

    const updated = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!updated) {
      console.warn("⚠️ Task not found with ID:", req.params.id);
      return res.status(404).json({ message: "Task not found" });
    }

    console.log("✅ Task updated:", updated);
    res.status(200).json(updated);
  } catch (error) {
    console.error("❌ Error updating task:", error);
    res.status(500).json({ error: error.message });
  }
});


//  Delete a task

const deleteTask = asyncHandler(async (req, res) => {
  try {
    console.info("➡️ [DELETE] Task ID:", req.params.id);

    const deleted = await Task.findByIdAndDelete(req.params.id);

    if (!deleted) {
      console.warn("⚠️ Task not found to delete:", req.params.id);
      return res.status(404).json({ message: "Task not found" });
    }

    console.log("✅ Task deleted:", deleted);
    res.status(200).json({ message: "Task Deleted" });
  } catch (error) {
    console.error("❌ Error deleting task:", error);
    res.status(500).json({ error: error.message });
  }
});



export { createTask, getTask, updateTask, deleteTask };
