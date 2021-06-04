"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateFields = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
/** Valida campos del Request */
function validateFields(req, res = express_1.response, next) {
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: false,
            errors: errors.mapped()
        });
    }
    /** OK Continua */
    next();
}
exports.validateFields = validateFields;
//# sourceMappingURL=ValidateFields.js.map