import { check } from 'express-validator';
import { Router } from 'express';
import { validateFields } from '../middlewares/ValidateFields';
import { login, renewToken } from '../controllers/AuthController';
import { validateJWT } from '../middlewares/ValidateToken';

const authRouter = Router();

/** Login de usuario */
authRouter.post('/', [
    check('email', 'El email es obligatorio y debe tener el formato correcto.').isEmail(),
    check('password', 'La contraseña es obligatoria, debe tener al menos 8 caracteres, debe ser conformada por números, una letra mayúscula, una minúscula y un carácter especial.').isStrongPassword({
        minLength: 8
    }),
    validateFields
], login);

/** Validar y renovar Token */
authRouter.get('/renew',
    validateJWT,
    renewToken);

export { authRouter };