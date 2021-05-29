import { check } from 'express-validator';
import { Router } from 'express';
import { validateFields } from '../middlewares/ValidateFields';
import { validateJWT } from '../middlewares/ValidateToken';
import { getUsers, getUsersById, createUser } from '../controllers/UsersController';
import { existEmail } from '../helpers/Validators';

const userRouter = Router();

userRouter.get('/',
    validateJWT,
    getUsers);

userRouter.get('/:id',
    validateJWT,
    getUsersById);

userRouter.post('/create', [
    check('name', 'El nombre es obligatorio.').not().isEmpty(),
    check('email', 'El email debe tener el formato válido.').isEmail(),
    check('email').custom(existEmail),
    check('password', 'La contraseña es obligatoria, debe tener al menos 8 caracteres, debe contener números, mayúsculas, minúsculas y un carácter especial.').isStrongPassword({
        minLength: 8
    }),
    validateFields
], createUser);


export { userRouter };
