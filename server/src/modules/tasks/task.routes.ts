import { Router } from 'express';
import { z } from 'zod';
import * as taskController from './task.controller.js';
import { validate } from '../../middleware/validate.js';
import { authenticate } from '../../middleware/auth.js';

const router = Router();

// All task routes require authentication
router.use(authenticate);

const createTaskSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().max(5000).optional(),
  status: z.enum(['TODO', 'IN_PROGRESS', 'IN_REVIEW', 'DONE']).optional(),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']).optional(),
  dueDate: z.string().datetime().optional(),
  assigneeId: z.string().uuid().optional(),
  labelIds: z.array(z.string().uuid()).optional(),
});

const updateTaskSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  description: z.string().max(5000).optional().nullable(),
  status: z.enum(['TODO', 'IN_PROGRESS', 'IN_REVIEW', 'DONE']).optional(),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']).optional(),
  dueDate: z.string().datetime().optional().nullable(),
  assigneeId: z.string().uuid().optional().nullable(),
  labelIds: z.array(z.string().uuid()).optional(),
});

const commentSchema = z.object({
  content: z.string().min(1).max(2000),
});

router.get('/', taskController.getTasks);
router.get('/labels', taskController.getLabels);
router.get('/:id', taskController.getTask);
router.post('/', validate(createTaskSchema), taskController.createTask);
router.patch('/:id', validate(updateTaskSchema), taskController.updateTask);
router.delete('/:id', taskController.deleteTask);
router.post('/:id/comments', validate(commentSchema), taskController.addComment);

export default router;
