import { Router } from 'express';
import { z } from 'zod';
import * as userController from './user.controller.js';
import { validate } from '../../middleware/validate.js';
import { authenticate } from '../../middleware/auth.js';
import { authorize } from '../../middleware/authorize.js';

const router = Router();

router.use(authenticate);
router.use(authorize('ADMIN'));

const updateRoleSchema = z.object({
  role: z.enum(['USER', 'ADMIN']),
});

router.get('/', userController.getUsers);
router.patch('/:id/role', validate(updateRoleSchema), userController.updateRole);
router.delete('/:id', userController.deleteUser);

export default router;
