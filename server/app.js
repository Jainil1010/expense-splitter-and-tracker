import express, { json } from 'express';
import { PORT } from './config/env.js';
import connectToDatabase from './config/mongoDB.js';

const app = express();

app.get('/', (req, res) => {
    res.send('Welcome to Bill Butcher API');
});

app.listen(PORT, async () => {
    console.log(`API is working on http://localhost:${PORT}`);
    await connectToDatabase();
});

export default app;
