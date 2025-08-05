import { Router } from 'express';
import { loginUser, registerUser } from '../controller/auth.controller.js';

const authRouter = new Router();

authRouter.post('/login', loginUser);

authRouter.post('/register', registerUser);

export default authRouter;