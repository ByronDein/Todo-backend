import {  login,  register} from '../src/controllers/userController.js';
import express from 'express';

const app = express();
app.use(express.json());


app.post('/api/users', login);
app.post('/api/users', register);


export default app;