import { Router } from 'express';
import { validateRequest } from '#middlewares';
import { loginSchema } from '#authmodule/schemas/index';
import { getSession, refreshSession } from '#authmodule/controller/auth-controller';

const router = Router();

router.post('/login', validateRequest(loginSchema), getSession);
router.get('/refresh-token', refreshSession);

export default router;