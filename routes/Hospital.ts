import { check } from 'express-validator';
import { Router } from 'express';
import { validateFields } from '../middlewares/ValidateFields';
import { validateJWT } from '../middlewares/ValidateToken';
import { get, getById, create, update, deleteHospital } from '../controllers/HospitalsController';
import { existHospital, existHospitalById } from '../helpers/Validators';

const hospitalRouter = Router();

hospitalRouter.get('/',
    validateJWT,
    get);

hospitalRouter.get('/:id',
    [
        validateJWT,
        check('id', 'No es un ID válido').isMongoId(),
        check('id').custom(existHospitalById),
        validateFields
    ],
    getById
);

hospitalRouter.post('/',
    [
        validateJWT,
        check('name', 'El nombre del hospital es necesario.').not().isEmpty(),
        check('address', 'La dirección del hospital es necesaria.').not().isEmpty(),
        check('cp', 'El Código Postal del hospital es necesario.').not().isEmpty(),
        check('city', 'La ciudad del hospital es necesaria.').not().isEmpty(),
        check('country', 'El país del hospital es necesaria.').not().isEmpty(),
        check('user', 'El ID del usuario es necesario.').not().isEmpty(),
        check('name').custom(existHospital),
        validateFields
    ],
    create
);

hospitalRouter.put('/:id',
    [
        validateJWT,
        check('name', 'El nombre del hospital es necesario.').not().isEmpty(),
        check('address', 'La dirección del hospital es necesaria.').not().isEmpty(),
        check('cp', 'El Código Postal del hospital es necesario.').not().isEmpty(),
        check('city', 'La ciudad del hospital es necesaria.').not().isEmpty(),
        check('country', 'El país del hospital es necesaria.').not().isEmpty(),
        check('user', 'El ID del usuario es necesario.').not().isEmpty(),
        check('id', 'No es un ID válido').isMongoId(),
        check('id').custom(existHospitalById),
        check('name').custom(existHospital),
        validateFields
    ],
    update
);

hospitalRouter.delete('/:id',
    [
        validateJWT,
        check('id', 'No es un ID válido').isMongoId(),
        check('id').custom(existHospitalById),
        validateFields
    ],
    deleteHospital
);


export { hospitalRouter };
