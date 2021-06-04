"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_validator_1 = require("express-validator");
const express_1 = require("express");
const ValidateFields_1 = require("../middlewares/ValidateFields");
const AuthController_1 = require("../controllers/AuthController");
const ValidateToken_1 = require("../middlewares/ValidateToken");
const authRouter = express_1.Router();
exports.authRouter = authRouter;
/** Login de usuario */
authRouter.post('/', [
    express_validator_1.check('email', 'El email es obligatorio y debe tener el formato válido.').isEmail(),
    express_validator_1.check('password', 'La contraseña es obligatoria.').not().isEmpty(),
    ValidateFields_1.validateFields
], AuthController_1.login);
/** Validar y renovar Token */
authRouter.get('/renew', ValidateToken_1.validateJWT, AuthController_1.renewToken);
//# sourceMappingURL=Auth.js.map