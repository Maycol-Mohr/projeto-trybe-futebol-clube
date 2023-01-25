import { Request, Response } from 'express';

import { UserCredentials } from '../interfaces/IUser';
import * as userService from '../services/userService';

export async function login(req: Request, res: Response) {
  const userCredentials = req.body as UserCredentials;

  const { status, data, error } = await userService.login(userCredentials);

  return error ? res.status(status)
    .json({ message: error.message }) : res.status(status).json(data);
}

export async function getUser(req: Request, res: Response) {
  const { user: { dataValues: { role } } } = req.body;

  return res.status(200).json({ role });
}
