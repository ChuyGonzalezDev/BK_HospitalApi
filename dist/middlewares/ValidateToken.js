"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateJWT = void 0;
const express_1 = require("express");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
require('dotenv').config();
function validateJWT(req, res = express_1.response, next) {
    return __awaiter(this, void 0, void 0, function* () {
        /** Leer Token */
        const token = req.header('token');
        if (!token) {
            return res.status(401).json({
                message: 'No hay token en la petición.'
            });
        }
        try {
            const decoded = jsonwebtoken_1.default.verify(token, process.env.SECRETPRIVATEKEY || '');
            let _decoded = decoded;
            req.id = _decoded.id;
            req.name = _decoded.name;
            /** Busca el usuario que correspopnda al id */
            const user = yield User_1.default.findById(req.id);
            if (!user) {
                return res.status(401).json({
                    message: `Token no es válido. - [${req.id}].`
                });
            }
            /** Si está inactivo */
            if (!user.status) {
                return res.status(401).json({
                    message: `Token no es válido - [${user.status}].`
                });
            }
            req.id = user.id;
            req.name = user.name;
            req.user = user;
            /** OK Continua */
            next();
        }
        catch (error) {
            return res.status(401).json({
                status: false,
                message: 'Token no válido.'
            });
        }
    });
}
exports.validateJWT = validateJWT;
;
//# sourceMappingURL=ValidateToken.js.map