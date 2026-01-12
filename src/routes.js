import { Router } from 'express';
import { authSession } from '#middlewares';
import AuthRouter from '#authmodule/router/auth-router';
import AdminRouter from '#adminsmodule/router/admin-router';
import ClientRouter from '#clientsmodule/router/client-router';
import RoleRouter from '#rolesmodule/router/role-router';

const router = Router();

router.use('/auth', AuthRouter);
router.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});
router.use(authSession);
router.use('/admins', AdminRouter);
router.use('/clients', ClientRouter);
router.use('/roles', RoleRouter);

export default router;