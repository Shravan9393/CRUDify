import express from 'express';

import {
    createTask,
    getTask,
    updateTask,
    deleteTask
} from '../controllers/taskController.js';


const router = express.Router();

/**
 * @swagger
 * /api/tasks:
 *   get:
 *     summary: Get all tasks
 *     responses:
 *       200:
 *         description: List of tasks
 */


router.post('/tasks', createTask);
router.get('/tasks' , getTask);
router.put('/tasks/:id', updateTask);
router.delete('/tasks/:id', deleteTask);

export default router;