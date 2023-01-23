import { Request, Response } from 'express';
import * as matchService from '../services/matchService';

export async function getMatches(req: Request, res: Response) {
  const { inProgress } = req.query;
  const matches = await matchService.getMatches(inProgress as string | undefined);
  return res.status(200).json(matches);
}

export async function saveMatch(req: Request, res: Response) {
  const credentials = req.body;
  const newMatch = await matchService.saveMatch(credentials);
  return res.status(201).json(newMatch);
}

export async function finishMatch(req: Request, res: Response) {
  const { id } = req.params;
  await matchService.finishMatch(Number(id));
  return res.status(200).json({ message: 'Finished' });
}
