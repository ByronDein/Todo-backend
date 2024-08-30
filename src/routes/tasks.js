import express from 'express';
import Task from '../models/task.js';

const router = express.Router();


router.get('/', async (req, res) => {
    try {
        const tasks = await Task.findAll()
        res.json(tasks)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.post('/', async (req, res) => {
    const task = Task.build({
        text: req.body.text,
        completed: false
    })
    try {
        const task = await Task.save(task)
        res.status(201).json(task)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.get('/:id', async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.id)
        if (task) {
            res.json(task)
        } else {
            res.status(404).json({ message: 'Task not found' })
        }
    } 
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})


router.patch('/:id', async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.id)
        if (task) {
            task.completed = !task.completed
            await Task.save(task)
            res.json(task)
        } 
        else {
            res.status(404).json({ message: 'Task not found' })
        }
    } 
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.id)
        if (task) {
            await Task.delete(task)
            res.json({ message: 'Task deleted' })
        } 
        else {
            res.status(404).json({ message: 'Task not found' })
        }
    } 
    catch (error) {
        res.status(500).json({ message: error.message })
    }
});



export default router;