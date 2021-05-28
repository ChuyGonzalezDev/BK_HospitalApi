import { check } from 'express-validator';
import { Router } from 'express';
import { validateFields } from '../middlewares/ValidateFields';
import { validateJWT } from '../middlewares/ValidateToken';
import { createUser } from '../controllers/UsersController';

const userRouter = Router();

/** Crear un nuevo usuario */
userRouter.post('/create', [
    check('name', 'El nombre es obligatorio.').not().isEmpty(),
    check('email', 'El email es obligatorio y debe tener el formato correcto.').isEmail(),
    check('password', 'La contraseña es obligatoria, debe tener al menos 8 caracteres, debe ser conformada por números, una letra mayúscula, una minúscula y un carácter especial.').isStrongPassword({
        minLength: 8
    }),
    validateFields
], createUser);


export { userRouter };
