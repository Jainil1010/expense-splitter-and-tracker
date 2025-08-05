import { Router } from 'express';
import { createGroup } from '../controller/gropu.controller.js';
import authorize from '../middlewares/auth.middleware.js';

const groupRouter = new Router();

groupRouter.post('/', authorize, createGroup);

groupRouter.get('/');

groupRouter.post('/:id/members');

groupRouter.delete('/:id/members/:id');

groupRouter.put('/:id/settings');

groupRouter.put(':id/members/:id/role');