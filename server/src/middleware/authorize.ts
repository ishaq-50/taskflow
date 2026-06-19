import { Request, Response, NextFunction } from 'express';
import { ForbiddenError } from '../utils/errors.js';

export function authorize(...roles: string[]) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    if (!req.user || !roles.includes(req.user.role)) {
      throw new ForbiddenError();
    }
    next();
  };
}
