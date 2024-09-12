import { getAllTasks, createTask, getTaskById, updateTask, deleteAllTasks, deleteTaskById } from '../src/controllers/taskController.js';
import express from 'express';

const app = express();
app.use(express.json());

app.get('/api/tasks', getAllTasks);
app.post('/api/tasks', createTask);
app.get('/api/tasks/:id', getTaskById);
app.patch('/api/tasks/:id', updateTask);
app.delete('/api/tasks', deleteAllTasks);
app.delete('/api/tasks/:id', deleteTaskById);

export default app;