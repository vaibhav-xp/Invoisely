import express from 'express';
import cors from 'cors';
import './config/db.config.js';
import { PORT } from './config/variables.config.js';
import userRouter from './routers/user.routes.js';
import productRouter from './routers/invoice.routes.js';

const app = express();

// CORS configuration to allow the specific origin
const corsOptions = {
    origin: 'https://invoisely.vercel.app',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
    credentials: true,
};

// Enable CORS with specific options
app.use(cors(corsOptions));

app.use(express.json());

// routes 
app.use('/api/user/', userRouter);
app.use('/api/invoice', productRouter);

app.get("/", (req, res) => {
    return res.json({
        status: Ok,
        message: "Everything is ok."
    })
})

// app listening
app.listen(PORT, () => {
    console.log("Server is connected at " + PORT);
});
