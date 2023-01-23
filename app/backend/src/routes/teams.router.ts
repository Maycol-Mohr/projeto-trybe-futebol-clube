import { Router } from 'express';
import * as teamController from '../controllers/teamController';

const router = Router();

router.get('/', teamController.getTeams);
router.get('/:id', teamController.getTeamId);

export default router;
