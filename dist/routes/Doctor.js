"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.doctorRouter = void 0;
const express_validator_1 = require("express-validator");
const express_1 = require("express");
const ValidateFields_1 = require("../middlewares/ValidateFields");
const ValidateToken_1 = require("../middlewares/ValidateToken");
const DoctorsController_1 = require("../controllers/DoctorsController");
const Validators_1 = require("../helpers/Validators");
const doctorRouter = express_1.Router();
exports.doctorRouter = doctorRouter;
doctorRouter.get('/', ValidateToken_1.validateJWT, DoctorsController_1.get);
doctorRouter.get('/:id', [
    ValidateToken_1.validateJWT,
    express_validator_1.check('id', 'No es un ID válido').isMongoId(),
    express_validator_1.check('id').custom(Validators_1.existDoctorById),
    ValidateFields_1.validateFields
], DoctorsController_1.getById);
doctorRouter.post('/', [
    ValidateToken_1.validateJWT,
    express_validator_1.check('name').not().isEmpty(),
    express_validator_1.check('lastName', 'Los apellidos son necesarios.').not().isEmpty(),
    express_validator_1.check('age', 'La edad es necesaria.').not().isEmpty(),
    express_validator_1.check('medicalSpeciality', 'La especualidad es necesaria.').not().isEmpty(),
    express_validator_1.check('phoneNumber', 'El número teléfonico es necesario.').not().isEmpty(),
    express_validator_1.check('phoneNumber', 'El número teléfonico debe ser de 10.').isLength({ min: 10, max: 10 }),
    express_validator_1.check('email', 'El correo eléctronico es necesario.').not().isEmpty(),
    express_validator_1.check('user', 'El ID del usuario es necesario.').not().isEmpty(),
    express_validator_1.check('hospital', 'El ID del hospital es necesario.').not().isEmpty(),
    express_validator_1.check('email').custom(Validators_1.existDoctorEmail),
    ValidateFields_1.validateFields
], DoctorsController_1.create);
doctorRouter.put('/:id', [
    ValidateToken_1.validateJWT,
    express_validator_1.check('name').not().isEmpty(),
    express_validator_1.check('lastName', 'Los apellidos son necesarios.').not().isEmpty(),
    express_validator_1.check('age', 'La edad es necesaria.').not().isEmpty(),
    express_validator_1.check('medicalSpeciality', 'La especualidad es necesaria.').not().isEmpty(),
    express_validator_1.check('phoneNumber', 'El número teléfonico es necesario.').not().isEmpty(),
    express_validator_1.check('phoneNumber', 'El número teléfonico debe ser de 10.').isLength({ min: 10, max: 10 }),
    express_validator_1.check('email', 'El correo eléctronico es necesario.').not().isEmpty(),
    express_validator_1.check('user', 'El ID del usuario es necesario.').not().isEmpty(),
    express_validator_1.check('hospital', 'El ID del hospital es necesario.').not().isEmpty(),
    express_validator_1.check('id', 'No es un ID válido').isMongoId(),
    express_validator_1.check('id').custom(Validators_1.existDoctorById),
    ValidateFields_1.validateFields
], DoctorsController_1.update);
doctorRouter.delete('/:id', [
    ValidateToken_1.validateJWT,
    express_validator_1.check('id', 'No es un ID válido').isMongoId(),
    express_validator_1.check('id').custom(Validators_1.existDoctorById),
    ValidateFields_1.validateFields
], DoctorsController_1.deleteDoctor);
//# sourceMappingURL=Doctor.js.map