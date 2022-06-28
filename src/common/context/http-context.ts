import type { Request, Response } from 'express';

export interface GqlHttpContext {
  req: Request;
  res: Response;
}
