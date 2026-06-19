import { Request, Response } from 'express';
import * as authService from './auth.service.js';

export async function register(req: Request, res: Response) {
  const { email, password, displayName } = req.body;
  const result = await authService.registerUser(email, password, displayName);
  res.status(201).json(result);
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;
  const result = await authService.loginUser(email, password);
  res.json(result);
}

export async function refresh(req: Request, res: Response) {
  const { refreshToken } = req.body;
  const result = await authService.refreshTokens(refreshToken);
  res.json(result);
}

export async function me(req: Request, res: Response) {
  const user = await authService.getProfile(req.user!.userId);
  res.json(user);
}
