import { Router } from 'express';
import { validateRequest } from '#middlewares';
import { loginSchema } from '#authmodule/schemas/index';
import { getSession } from '#authmodule/controller/auth-controller';

const router = Router();

router.post('/login', validateRequest(loginSchema), getSession);

router.get('/refresh-token', (req, res) => {
  // Handle token refresh
  res.send('Refresh token endpoint');
});

export default router;