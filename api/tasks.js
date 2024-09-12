import { getAllTasks, createTask, getTaskById, updateTask, deleteAllTasks, deleteTaskById } from '../src/controllers/taskController.js';

export default async (req, res) => {
  switch (req.method) {
    case 'GET':
      if (req.query.id) {
        await getTaskById(req, res);
      } else {
        await getAllTasks(req, res);
      }
      break;
    case 'POST':
      await createTask(req, res);
      break;
    case 'PATCH':
      await updateTask(req, res);
      break;
    case 'DELETE':
      if (req.query.id) {
        await deleteTaskById(req, res);
      } else {
        await deleteAllTasks(req, res);
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PATCH', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};