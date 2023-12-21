import { Request, Response, NextFunction } from 'express';
import Database from './database/auth';
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';

export interface UserRequest extends Request {
  user: JwtPayload;
}

function verifyToken(potentialToken: string): Promise<string | JwtPayload | null> {
  return new Promise(resolve => {
    jwt.verify(potentialToken, process.env.JWT_KEY, (err, decoded) => {
      if (err) resolve(null);
      else resolve(decoded);
    });
  });
}

// Decode the JWT and add the decoded information to the request
export async function parseJWT(req: Request, res: Response, next: NextFunction) {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).send({ error: 'Missing token' });

  const tokenData = await verifyToken(token);
  if (!tokenData || typeof tokenData === 'string')
    return res.status(401).send({ error: 'Invalid Token' });

  const userRequest = req as UserRequest;
  userRequest.user = tokenData;
  next();
}

const middlewares = [parseJWT];
export default middlewares;
