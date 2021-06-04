"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require('dotenv').config();
function generateJWT(id, name) {
    const payload = { id, name };
    return new Promise((resolve, reject) => {
        jsonwebtoken_1.default.sign(payload, process.env.SECRETPRIVATEKEY || '', {
            expiresIn: '24h',
        }, (error, token) => {
            if (error) {
                /** No valido */
                reject(error);
                console.error(`Error al generar JWT: ${error}.`);
            }
            else {
                /** Valido */
                resolve(token);
            }
        });
    });
}
exports.generateJWT = generateJWT;
//# sourceMappingURL=JWT.js.map