import { Request, Response } from 'express';
import * as teamService from '../services/teamService';

export async function getTeams(req: Request, res: Response) {
  const teams = await teamService.getTeams();
  return res.status(200).json(teams);
}

export async function getTeamId(req: Request, res: Response) {
  const { id } = req.params;
  const team = await teamService.getTeamId(Number(id));
  return res.status(200).json(team);
}
