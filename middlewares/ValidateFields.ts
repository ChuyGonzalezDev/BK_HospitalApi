import { response } from 'express';
import { validationResult } from 'express-validator';

/** Valida campos del Request */
const validateFields = (req: any, res = response, next: any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        });
    }

    /** OK Continua */
    next();
}

export { validateFields };
