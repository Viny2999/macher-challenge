import { checkIfAuthenticated } from '../../middlewares/auth';
import { UserService } from '../../services';
import { Router } from 'express';

const router = Router();
const userService = new UserService();

router.get('/', checkIfAuthenticated, userService.findAll);
router.get('/:id', checkIfAuthenticated, userService.findOne);
router.post('/', checkIfAuthenticated, userService.create);
router.put('/:id', checkIfAuthenticated, userService.update);
router.delete('/:id', checkIfAuthenticated, userService.delete);

export const UserController: Router = router;
