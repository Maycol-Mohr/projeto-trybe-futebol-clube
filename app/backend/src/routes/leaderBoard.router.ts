import { Router } from 'express';
import * as leaderBoardController from '../controllers/leaderBoardController';

const router = Router();

router.get('/home', leaderBoardController.getHomeClassification);
router.get('/away', leaderBoardController.getAwayClassification);
// router.get('/learderboard', leaderBoardController.getLeaderboardClassification);

export default router;
