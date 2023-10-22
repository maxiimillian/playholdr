import HandlerResponse from '@/types/handlerResponse';
import database from '../database/auth';
import { defaultModelHandler, defaultFailResponse, defaultSuccessResponse } from './handler';
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

export default class Handler {
  static createResponses(message: string) {
    const successResponse: HandlerResponse = { ...defaultSuccessResponse, message };
    const errorResponse: HandlerResponse = { ...defaultFailResponse, message };

    return { successResponse, errorResponse };
  }

  static hashPassword(plainPassword: string): Promise<string> {
    return new Promise((resolve, reject) => {
      bcrypt.hash(plainPassword, SALT_ROUNDS, (err, hash) => {
        if (hash) resolve(hash);
        else reject(err);
      });
    });
  }

  static compareHashes(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      bcrypt.compare(plainPassword, hashedPassword, (err, result) => {
        if (!err) resolve(result);
        else reject(err);
      });
    });
  }

  static async login(message: string, username: string, passwordAttempt: string) {
    const { successResponse, errorResponse } = Handler.createResponses(message);

    const user: any = await database.getUserByUsername(username);
    if (!user) return { ...errorResponse, data: 'Invalid Username' };

    const isCorrectPassword: boolean = await Handler.compareHashes(passwordAttempt, user.password);
    if (!isCorrectPassword) return { ...errorResponse, data: 'Invalid Password' };

    const tokenResponse = await database.refreshToken(user.id);
    return { ...successResponse, data: tokenResponse };
  }

  static async register(message: string, username: string, password: string, email: string) {
    const { successResponse, errorResponse } = Handler.createResponses(message);
    const hashedPassword: string = await Handler.hashPassword(password);

    const response = await new Promise((resolve, reject) => {
      database
        .createUser(username, hashedPassword, email)
        .then(([user]: [user: any]) => {
          database
            .refreshToken(user.id)
            .then(modelResponse => {
              resolve({ ...successResponse, data: modelResponse }); // Success
            })
            .catch(err => {
              resolve({ ...errorResponse, data: err.toString() }); // Unknown Error
            });
        })
        .catch(err => {
          resolve({ ...errorResponse, data: err.toString() });
        });
    });

    return response;
  }
}
