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
exports.renewToken = exports.login = void 0;
const express_1 = require("express");
const User_1 = __importDefault(require("../models/User"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const JWT_1 = require("../helpers/JWT");
require('dotenv').config();
function login(req, res = express_1.response) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = req.body;
        try {
            /** Verificar email único.  */
            const user = yield User_1.default.findOne({ email });
            if (!user) {
                return res.status(400).json({
                    message: `Usuario o contraseña no son correctos - [${email}].`
                });
            }
            /** Si está inactivo */
            if (!user.status) {
                return res.status(400).json({
                    message: `Usuario o contraseña no son correctos - [${user.status}].`
                });
            }
            /** Verificar password */
            const isValid = bcryptjs_1.default.compareSync(password, user.password);
            if (!isValid) {
                return res.status(400).json({
                    message: 'Usuario o contraseña no son correctos.'
                });
            }
            /** Generar el JWT */
            const token = yield JWT_1.generateJWT(user.id, user.name);
            res.json({
                id: user.id,
                name: user.name,
                email,
                status: user.status,
                token
            });
        }
        catch (error) {
            return res.status(500).json({
                message: 'Por favor hable con el administrador.'
            });
        }
    });
}
exports.login = login;
;
function renewToken(req, res = express_1.response) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id, name } = req;
        const user = req.user;
        /** Generar el JWT */
        const token = yield JWT_1.generateJWT(user.id, user.name);
        res.json({
            id: user.id,
            name: user.name,
            email: user.email,
            status: true,
            token
        });
    });
}
exports.renewToken = renewToken;
;
//# sourceMappingURL=AuthController.js.map