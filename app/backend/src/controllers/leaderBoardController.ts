import { Request, Response } from 'express';
import leaderBoardService from '../services/leaderBoardService';

export async function getHomeClassification(req: Request, res: Response) {
  const teams = await leaderBoardService.getHomeClassification();
  return res.status(200).json(teams);
}

// export async function getAwayClassification(req: Request, res: Response) {
//   const teams = await leaderBoardService.getAwayClassification();
//   return res.status(200).json(teams);
// }

// export async function getLeaderboardClassification(req: Request, res: Response) {
//   const teams = await leaderBoardService.getLeaderboardClassification();
//   return res.status(200).json(teams);
// }

export default { getHomeClassification };
