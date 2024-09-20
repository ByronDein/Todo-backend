import Task from '../models/Task.js';
export const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.findAll();
        if (tasks) {
            res.json(tasks);
        } else {
            res.status(404).json({ message: 'Tasks not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createTask = async (req, res) => {
    const task = Task.build({
        text: req.body.text,
        completed: false,
        userId: req.body.userId,
    });
    try {
        const savedTask = await task.save();
        res.status(201).json(savedTask);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getTaskById = async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.id);
        if (task) {
            res.json(task);
        } else {
            res.status(404).json({ message: 'Task not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateTask = async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.id);
        if (task) {
            task.completed = !task.completed;
            await task.save();
            res.json(task);
        } else {
            res.status(404).json({ message: 'Task not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteAllTasks = async (req, res) => {
    try {
        const deletedCount = await Task.destroy({ where: {} });
        if (deletedCount > 0) {
            res.json({ message: 'All tasks were deleted' });
        } else {
            res.status(404).json({ message: 'Tasks not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteTaskById = async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.id);
        if (task) {
            await task.destroy();
            res.json({ message: 'Task deleted' });
        } else {
            res.status(404).json({ message: 'Task not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};