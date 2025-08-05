import { Router } from 'express';

const groupRouter = new Router();

groupRouter.post('/');

groupRouter.get('/');

groupRouter.post('/:id/members');

groupRouter.delete('/:id/members/:id');

groupRouter.put('/:id/settings');

groupRouter.put(':id/members/:id/role');