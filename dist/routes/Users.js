"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_validator_1 = require("express-validator");
const express_1 = require("express");
const ValidateFields_1 = require("../middlewares/ValidateFields");
const ValidateToken_1 = require("../middlewares/ValidateToken");
const UsersController_1 = require("../controllers/UsersController");
const Validators_1 = require("../helpers/Validators");
const userRouter = express_1.Router();
exports.userRouter = userRouter;
userRouter.get('/', ValidateToken_1.validateJWT, UsersController_1.getUsers);
userRouter.get('/:id', [
    ValidateToken_1.validateJWT,
    express_validator_1.check('id', 'No es un ID válido').isMongoId(),
    express_validator_1.check('id').custom(Validators_1.existUserById),
    ValidateFields_1.validateFields
], UsersController_1.getUsersById);
userRouter.post('/', [
    express_validator_1.check('name', 'El nombre es obligatorio.').not().isEmpty(),
    express_validator_1.check('email', 'El email debe tener el formato válido.').isEmail(),
    express_validator_1.check('email').custom(Validators_1.existEmail),
    express_validator_1.check('password', 'La contraseña es obligatoria, debe tener al menos 8 caracteres, debe contener números, mayúsculas, minúsculas y un carácter especial.').isStrongPassword({
        minLength: 8
    }),
    ValidateFields_1.validateFields
], UsersController_1.createUser);
userRouter.put('/:id', [
    ValidateToken_1.validateJWT,
    express_validator_1.check('id', 'No es un ID válido').isMongoId(),
    express_validator_1.check('id').custom(Validators_1.existUserById),
    ValidateFields_1.validateFields
], UsersController_1.updateUser);
userRouter.delete('/:id', [
    ValidateToken_1.validateJWT,
    express_validator_1.check('id', 'No es un ID válido').isMongoId(),
    express_validator_1.check('id').custom(Validators_1.existUserById)
], UsersController_1.deleteUser);
//# sourceMappingURL=Users.js.map