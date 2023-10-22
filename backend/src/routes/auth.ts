import express from 'express';
import RouteHandler, { defaultRoute } from './route';
import Database from '../database/auth';
import handler from '../handlers/auth';

const router = express.Router();
const route = new RouteHandler(router);

const defaultRoutes: defaultRoute[] = [
  {
    path: 'POST+/refresh',
    args: ['userId'],
    message: 'Successfully refreshed token',
    modelFunction: Database.refreshToken,
  },
  {
    path: 'POST+/profile',
    message: 'Successfully returned profile',
    modelFunction: Database.getProfile,
  },
  {
    path: 'POST+/login',
    message: 'Successfully logged in',
    handler: handler.login,
    args: ['username', 'password'],
  },
  {
    path: 'POST+/register',
    message: 'Successfully registered',
    handler: handler.register,
    args: ['username', 'password', 'email'],
  },
];

route.registerDefaults(defaultRoutes);

export default router;
