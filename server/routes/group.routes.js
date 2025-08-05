import { Router } from 'express';
import { addMembers, changeMemberRole, createGroup, removeMember } from '../controller/group.controller.js';
import authorize from '../middlewares/auth.middleware.js';

const groupRouter = new Router();

groupRouter.post('/', authorize, createGroup);

groupRouter.get('/');

groupRouter.post('/:id/members', authorize, addMembers);

groupRouter.delete('/:id/members/:id', authorize, removeMember);

groupRouter.put('/:id/settings');

groupRouter.put(':id/members/:id/role', authorize, changeMemberRole);