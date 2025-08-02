import express, { json } from 'express';
import { PORT } from './config/env.js';

const app = express();

app.get('/', (req, res) => {
    res.send('Welcome to Bill Butcher API');
});

app.listen(PORT, () => {
    console.log(`API is working on http://localhost:${PORT}`);
});

export default app;
