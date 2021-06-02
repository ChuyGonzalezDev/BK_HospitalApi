import { check } from 'express-validator';
import { Router } from 'express';
import { validateFields } from '../middlewares/ValidateFields';
import { validateJWT } from '../middlewares/ValidateToken';
import { create, deleteDoctor, get, getById, update } from '../controllers/DoctorController';
import { existDoctorById, existDoctorEmail } from '../helpers/Validators';

const doctorRouter = Router();

doctorRouter.get('/',
    validateJWT,
    get);

doctorRouter.get('/:id',
    [
        validateJWT,
        check('id', 'No es un ID válido').isMongoId(),
        check('id').custom(existDoctorById),
        validateFields
    ],
    getById
);

doctorRouter.post('/',
    [
        validateJWT,
        check('name').not().isEmpty(),
        check('lastName', 'Los apellidos son necesarios.').not().isEmpty(),
        check('age', 'La edad es necesaria.').not().isEmpty(),
        check('medicalSpeciality', 'La especualidad es necesaria.').not().isEmpty(),
        check('phoneNumber', 'El número teléfonico es necesario.').not().isEmpty(),
        check('phoneNumber', 'El número teléfonico debe ser de 10.').isLength({ min: 10, max: 10 }),
        check('email', 'El correo eléctronico es necesario.').not().isEmpty(),
        check('user', 'El ID del usuario es necesario.').not().isEmpty(),
        check('hospital', 'El ID del hospital es necesario.').not().isEmpty(),
        check('email').custom(existDoctorEmail),
        validateFields
    ],
    create
);

doctorRouter.put('/:id',
    [
        validateJWT,
        check('name').not().isEmpty(),
        check('lastName', 'Los apellidos son necesarios.').not().isEmpty(),
        check('age', 'La edad es necesaria.').not().isEmpty(),
        check('medicalSpeciality', 'La especualidad es necesaria.').not().isEmpty(),
        check('phoneNumber', 'El número teléfonico es necesario.').not().isEmpty(),
        check('phoneNumber', 'El número teléfonico debe ser de 10.').isLength({ min: 10, max: 10 }),
        check('email', 'El correo eléctronico es necesario.').not().isEmpty(),
        check('user', 'El ID del usuario es necesario.').not().isEmpty(),
        check('hospital', 'El ID del hospital es necesario.').not().isEmpty(),
        check('id', 'No es un ID válido').isMongoId(),
        check('id').custom(existDoctorById),
        validateFields
    ],
    update
);

doctorRouter.delete('/:id',
    [
        validateJWT,
        check('id', 'No es un ID válido').isMongoId(),
        check('id').custom(existDoctorById),
        validateFields
    ],
    deleteDoctor
);


export { doctorRouter };
