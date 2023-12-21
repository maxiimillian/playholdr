import dbClient from './client';
import crypto from 'crypto';
import { User } from '@customTypes/schema';
import jwt, { SignOptions } from 'jsonwebtoken';

const jwtOptions: SignOptions = {
  expiresIn: '7 days',
};

export default class Database {
  static getToken(token: string) {
    return dbClient.knex.select('*').from('boards');
  }

  static getUserByToken(token: string) {
    return dbClient.knex
      .select({
        id: 'users.id',
        name: 'users.name',
        token: 'tokens.token',
      })
      .from('tokens')
      .join('users', 'users.id', 'tokens.user_id')
      .where('tokens.token', '=', token);
  }

  static refreshToken(userId: number) {
    const token = crypto.randomBytes(20).toString('hex');

    const query = `
        INSERT INTO tokens (user_id, token)
        VALUES (:userId, :token)
        ON CONFLICT (user_id) 
        DO UPDATE
        SET token = :token
        WHERE tokens.user_id = :userId
        RETURNING token;
    `;
    const params = { userId, token };

    return dbClient.runRawQuery(query, params);
  }

  static getUserByUsername(username: string): Promise<User> {
    return dbClient.knex
      .queryBuilder()
      .select('*')
      .from('users')
      .where('name', '=', username)
      .first();
  }

  static getProfile(userId: number) {
    const query = ``;
    return dbClient.runRawQuery(query);
  }

  static createUser(name: string, password: string, email: string): Promise<User> {
    const payload = { name, password, email };
    return dbClient.knex.queryBuilder().insert(payload).into('users').returning<User>('*');
  }

  static createToken(user: User) {
    const token = jwt.sign(user, process.env.JWT_KEY, jwtOptions);
    return token;
  }
}
