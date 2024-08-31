import express from 'express';
import cors from 'cors';
import './config/db.config.js';
import { PORT } from './config/variables.config.js';
import userRouter from './routers/user.routes.js';
import productRouter from './routers/invoice.routes.js';

const app = express();

// Configure CORS options
const corsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type,Authorization,x-access-token',
};

// Enable CORS with the above options
app.use(cors(corsOptions));

app.use(express.json());

// routes 
app.use('/api/user/', userRouter);
app.use('/api/invoice', productRouter);

// app listening
app.listen(PORT, () => {
    console.log("Server is connected at " + PORT);
});
