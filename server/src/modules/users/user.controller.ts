import { Request, Response } from 'express';
import * as userService from './user.service.js';

export async function getUsers(_req: Request, res: Response) {
  const users = await userService.getAllUsers();
  res.json(users);
}

export async function updateRole(req: Request, res: Response) {
  const user = await userService.updateUserRole(req.params.id as string, req.body.role);
  res.json(user);
}

export async function deleteUser(req: Request, res: Response) {
  await userService.deleteUser(req.params.id as string);
  res.status(204).end();
}
