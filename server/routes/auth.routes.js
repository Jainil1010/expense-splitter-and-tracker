import { Router } from 'express';
import { loginUser, registerUser } from '../controller/auth.controller.js';

const authRouter = new Router();

authRouter.post('/login', loginUser);

authRouter.post('/register', registerUser);

authRouter.post('/logout', (req, res) => {
    res.send('logout');
});

export default authRouter;