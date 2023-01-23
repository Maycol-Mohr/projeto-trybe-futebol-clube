import { Router } from 'express';
import validateJWT from '../auth/validateJWT';
import validateFields from '../middlewares/validateFields';
import * as userController from '../controllers/userController';

const router = Router();

router.post('/', validateFields, userController.login);
router.get('/validate', validateJWT, userController.getUser);

export default router;
