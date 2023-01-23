import { Request, Response } from 'express';
import * as matchService from '../services/matchService';

export async function getMatches(req: Request, res: Response) {
  const { inProgress } = req.query;
  const matches = await matchService.getMatches(inProgress as string | undefined);
  return res.status(200).json(matches);
}

export async function saveMatches(req: Request, res: Response) {
  const matches = {};
  return res.status(200).json(matches);
}
