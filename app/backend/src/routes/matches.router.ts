import { Router } from 'express';
import validateMatches from '../middlewares/validateMatches';
import validateJWT from '../auth/validateJWT';
import * as matchController from '../controllers/matchController';

const router = Router();

router.get('/', matchController.getMatches);
router.post('/', validateJWT, validateMatches, matchController.saveMatch);
router.patch('/:id/finish', matchController.finishMatch);
router.patch('/:id', matchController.updateMatch);

export default router;
