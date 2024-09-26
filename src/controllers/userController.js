import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
    try {
        const verifyEmail = await User.findOne({ where: { email: req.body.email } });
        if (verifyEmail) {
            return res.status(400).json({ message: 'Email already exists, try changing the password for this email' });
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        });
        res.status(201).json({ message: 'User created successfully'});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const login = async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await User.findOne({ where: { email: email } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        const token = jwt.sign({email: email, password: password }, process.env.TOKEN_SECRET);
        res.header('auth-token', token).json({ token, user: user.id, name: user.username });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const  verifyToken = (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).json({ message: 'Access denied' });
    }
    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid token' });
    }
}
