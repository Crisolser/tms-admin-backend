import { Router } from 'express';
import { authSession } from '#middlewares';
import AuthRouter from '#authmodule/router/auth-router';

const router = Router();

router.use('/auth', AuthRouter);
router.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});
router.use(authSession);

export default router;