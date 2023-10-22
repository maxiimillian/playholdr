import { Request, Response, NextFunction } from 'express';
import Database from './database/auth';
function auth(req: Request, res: Response, next: NextFunction) {
  const token = req.body.token;
  Database.getUserByToken(token).then((user: any) => {
    res.locals.isAuthenticated = !!res;
    res.locals.user = user;
    next();
  });
}

const middlewares = [auth];
export default middlewares;
