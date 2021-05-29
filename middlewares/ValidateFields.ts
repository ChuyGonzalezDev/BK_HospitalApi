import { response } from 'express';
import { validationResult } from 'express-validator';

/** Valida campos del Request */
function validateFields(req: any, res = response, next: () => void) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: false,
            errors: errors.mapped()
        });
    }

    /** OK Continua */
    next();
}

export { validateFields };
