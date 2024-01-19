import { AuthController } from '../../controllers/v1/auth.controller';
import { Router } from 'express';
import { validate } from '../../middlewares/validate';
import { loginBody } from '../../validations';

const router = Router();
const authController = new AuthController();

router.post('/login', validate(loginBody), authController.login);

export const AuthRoute: Router = router;
