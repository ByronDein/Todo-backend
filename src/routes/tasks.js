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