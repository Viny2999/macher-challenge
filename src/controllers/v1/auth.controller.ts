import { AuthService } from '../../services';
import { Router } from 'express';
import { validate } from '../../middlewares/validate';
import { loginBody } from '../../validations';

const router = Router();
const authService = new AuthService();

router.post('/login', validate(loginBody), authService.login);

export const AuthController: Router = router;
