import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User from '../model/usermodel';
 
async function registerUser(req: Request, res: Response) {
    const { username, email, password } = req.body;
 
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }
        const newUser = new User({ username, email, password });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
 
async function loginUser(req: Request, res: Response) {
    const { email, password } = req.body;
 
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }
        res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
const userController = {
    registerUser,
    loginUser,
};
export default userController;
 