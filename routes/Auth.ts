import { check } from 'express-validator';
import { Router } from 'express';
import { validateFields } from '../middlewares/ValidateFields';
import { login, renewToken } from '../controllers/AuthController';
import { validateJWT } from '../middlewares/ValidateToken';

const authRouter = Router();

/** Login de usuario */
authRouter.post('/', [
    check('email', 'El email es obligatorio y debe tener el formato válido.').isEmail(),
    check('password', 'La contraseña es obligatoria.').not().isEmpty(),
    validateFields
], login);

/** Validar y renovar Token */
authRouter.get('/renew',
    validateJWT,
    renewToken);

export { authRouter };