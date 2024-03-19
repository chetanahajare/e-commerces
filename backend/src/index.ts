import express, { Request, Response, NextFunction } from 'express';
import http from 'http';
import cors from 'cors';
import mongoose from 'mongoose';
import userloginRouter from "./router/e-login"; 

const app = express();
const server = http.createServer(app);

const PORT: number | string = process.env.PORT || 9000;
const allowedOrigins: string[] = ['http://localhost:4200'];

mongoose.connect("mongodb://localhost:27017/LMS_DataBase", {
    useNewUrlParser: true,
    useUnifiedTopology: true
} as any)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

app.use(cors({
    origin: (origin: string | undefined, callback: (error: Error | null, success?: boolean) => void) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use userloginRouter for routes
app.use('/api', userloginRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
