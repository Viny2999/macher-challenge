import { checkIfAuthenticated } from '../../middlewares/auth';
import { UserController } from '../../controllers/v1/user.controller';
import { Router } from 'express';
import { validate } from '../../middlewares/validate';
import { userFindOne, userCreate, userUpdate, userDelete } from '../../validations';

const router = Router();
const userController = new UserController();

router.get('/', checkIfAuthenticated, userController.findAll);
router.get('/:id', checkIfAuthenticated, validate(userFindOne), userController.findOne);
router.post('/', checkIfAuthenticated, validate(userCreate), userController.create);
router.put('/:id', checkIfAuthenticated, validate(userUpdate), userController.update);
router.delete('/:id', checkIfAuthenticated, validate(userDelete), userController.delete);

export const UserRoute: Router = router;
