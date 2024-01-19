import { checkIfAuthenticated } from '../../middlewares/auth';
import { UserService } from '../../services';
import { Router } from 'express';
import { validate } from '../../middlewares/validate';
import { userFindOne, userCreate, userUpdate, userDelete } from '../../validations';

const router = Router();
const userService = new UserService();

router.get('/', checkIfAuthenticated, userService.findAll);
router.get('/:id', checkIfAuthenticated, validate(userFindOne), userService.findOne);
router.post('/', checkIfAuthenticated, validate(userCreate), userService.create);
router.put('/:id', checkIfAuthenticated, validate(userUpdate), userService.update);
router.delete('/:id', checkIfAuthenticated, validate(userDelete), userService.delete);

export const UserController: Router = router;
