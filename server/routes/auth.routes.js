import { Router } from 'express';

const authRouter = new Router();

authRouter.post('/login', (req, res) => {
    res.send('Login');
});

authRouter.post('/register', (rerq, res) => {
    res.send('register');
});

authRouter.post('/logout', (req, res) => {
    res.send('logout');
});

export default authRouter;