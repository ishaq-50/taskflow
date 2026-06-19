import { Request, Response } from 'express';
import * as taskService from './task.service.js';

export async function getTasks(req: Request, res: Response) {
  const result = await taskService.getTasks({
    status: req.query.status as string,
    priority: req.query.priority as string,
    assigneeId: req.query.assigneeId as string,
    search: req.query.search as string,
    sortBy: req.query.sortBy as string,
    sortOrder: req.query.sortOrder as 'asc' | 'desc',
    page: req.query.page ? parseInt(req.query.page as string) : undefined,
    limit: req.query.limit ? parseInt(req.query.limit as string) : undefined,
  });
  res.json(result);
}

export async function getTask(req: Request, res: Response) {
  const task = await taskService.getTaskById(req.params.id as string);
  res.json(task);
}

export async function createTask(req: Request, res: Response) {
  const task = await taskService.createTask(req.user!.userId, req.body);
  res.status(201).json(task);
}

export async function updateTask(req: Request, res: Response) {
  const task = await taskService.updateTask(
    req.params.id as string,
    req.user!.userId,
    req.user!.role,
    req.body,
  );
  res.json(task);
}

export async function deleteTask(req: Request, res: Response) {
  await taskService.deleteTask(req.params.id as string, req.user!.userId, req.user!.role);
  res.status(204).end();
}

export async function addComment(req: Request, res: Response) {
  const comment = await taskService.addComment(req.params.id as string, req.user!.userId, req.body.content);
  res.status(201).json(comment);
}

export async function getLabels(_req: Request, res: Response) {
  const labels = await taskService.getLabels();
  res.json(labels);
}
