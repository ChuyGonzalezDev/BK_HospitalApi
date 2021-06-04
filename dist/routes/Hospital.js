"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hospitalRouter = void 0;
const express_validator_1 = require("express-validator");
const express_1 = require("express");
const ValidateFields_1 = require("../middlewares/ValidateFields");
const ValidateToken_1 = require("../middlewares/ValidateToken");
const HospitalsController_1 = require("../controllers/HospitalsController");
const Validators_1 = require("../helpers/Validators");
const hospitalRouter = express_1.Router();
exports.hospitalRouter = hospitalRouter;
hospitalRouter.get('/', ValidateToken_1.validateJWT, HospitalsController_1.get);
hospitalRouter.get('/:id', [
    ValidateToken_1.validateJWT,
    express_validator_1.check('id', 'No es un ID válido').isMongoId(),
    express_validator_1.check('id').custom(Validators_1.existHospitalById),
    ValidateFields_1.validateFields
], HospitalsController_1.getById);
hospitalRouter.post('/', [
    ValidateToken_1.validateJWT,
    express_validator_1.check('name', 'El nombre del hospital es necesario.').not().isEmpty(),
    express_validator_1.check('address', 'La dirección del hospital es necesaria.').not().isEmpty(),
    express_validator_1.check('cp', 'El Código Postal del hospital es necesario.').not().isEmpty(),
    express_validator_1.check('city', 'La ciudad del hospital es necesaria.').not().isEmpty(),
    express_validator_1.check('country', 'El país del hospital es necesaria.').not().isEmpty(),
    express_validator_1.check('user', 'El ID del usuario es necesario.').not().isEmpty(),
    express_validator_1.check('name').custom(Validators_1.existHospital),
    ValidateFields_1.validateFields
], HospitalsController_1.create);
hospitalRouter.put('/:id', [
    ValidateToken_1.validateJWT,
    express_validator_1.check('name', 'El nombre del hospital es necesario.').not().isEmpty(),
    express_validator_1.check('address', 'La dirección del hospital es necesaria.').not().isEmpty(),
    express_validator_1.check('cp', 'El Código Postal del hospital es necesario.').not().isEmpty(),
    express_validator_1.check('city', 'La ciudad del hospital es necesaria.').not().isEmpty(),
    express_validator_1.check('country', 'El país del hospital es necesaria.').not().isEmpty(),
    express_validator_1.check('user', 'El ID del usuario es necesario.').not().isEmpty(),
    express_validator_1.check('id', 'No es un ID válido').isMongoId(),
    express_validator_1.check('id').custom(Validators_1.existHospitalById),
    express_validator_1.check('name').custom(Validators_1.existHospital),
    ValidateFields_1.validateFields
], HospitalsController_1.update);
hospitalRouter.delete('/:id', [
    ValidateToken_1.validateJWT,
    express_validator_1.check('id', 'No es un ID válido').isMongoId(),
    express_validator_1.check('id').custom(Validators_1.existHospitalById),
    ValidateFields_1.validateFields
], HospitalsController_1.deleteHospital);
//# sourceMappingURL=Hospital.js.map