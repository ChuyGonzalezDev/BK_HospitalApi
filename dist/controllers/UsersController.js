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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUsersById = exports.getUsers = void 0;
const express_1 = require("express");
const User_1 = __importDefault(require("../models/User"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
require('dotenv').config;
/** Obtener Usuarios con paginación */
function getUsers(req = express_1.request, res = express_1.response) {
    return __awaiter(this, void 0, void 0, function* () {
        const { rows = 5, from = 0 } = req.query;
        /** Únicamente los activos. */
        const query = { status: true };
        const [total, users] = yield Promise.all([
            User_1.default.countDocuments(query),
            User_1.default.find(query).skip(Number(from)).limit(Number(rows))
        ]);
        res.json({
            total,
            users
        });
    });
}
exports.getUsers = getUsers;
;
/** Obtener Usuarios por Id */
function getUsersById(req = express_1.request, res = express_1.response) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        /** En caso de no querer monstrar el estatus. */
        //const user = await User.findById(id, { status: false });
        const user = yield User_1.default.findById(id);
        res.json({ user });
    });
}
exports.getUsersById = getUsersById;
;
/** Crear Usuario */
function createUser(req = express_1.request, res = express_1.response) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name, email, password } = req.body;
        const user = new User_1.default({ name, email, password });
        try {
            /** Se asignan valores de Usuario por Default */
            user.status = true;
            /** HASH de password */
            const salt = bcryptjs_1.default.genSaltSync(10);
            user.password = bcryptjs_1.default.hashSync(password, salt);
            /** Crear usuario en BD */
            yield user.save();
            /** Respuesta exitosa */
            res.status(201).json({
                user,
                message: 'Creación de Usuario correctamente.'
            });
        }
        catch (error) {
            return res.status(500).json({
                message: 'Por favor hable con el administrador.'
            });
        }
    });
}
exports.createUser = createUser;
;
/** Actualizar Usuario */
function updateUser(req = express_1.request, res = express_1.response) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        const _a = req.body, { _id, email, password } = _a, user = __rest(_a, ["_id", "email", "password"]);
        if (password) {
            /** HASH de password */
            const salt = bcryptjs_1.default.genSaltSync(10);
            user.password = bcryptjs_1.default.hashSync(password, salt);
        }
        if (email) {
            user.email = email;
        }
        const userResponse = yield User_1.default.findByIdAndUpdate(id, user);
        if (userResponse) {
            res.status(200).json({
                user: {
                    id: id,
                    name: user.name,
                    email: user.email
                },
                message: 'Se realizó la actualización correctamente.'
            });
        }
        else {
            res.status(400).json({
                message: 'Error en la actualización.'
            });
        }
    });
}
exports.updateUser = updateUser;
/** Deshabilitar Usuario */
function deleteUser(req = express_1.request, res = express_1.response) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        const userResponse = yield User_1.default.findByIdAndUpdate(id, { status: false });
        if (userResponse) {
            res.status(200).json({
                user: {
                    id: id,
                    name: userResponse.name,
                    email: userResponse.email,
                    status: false
                },
                message: 'Se deshabilito el Usuario correctamente.'
            });
        }
        else {
            res.status(400).json({
                message: 'Error al deshabilitar el Usuario.'
            });
        }
    });
}
exports.deleteUser = deleteUser;
//# sourceMappingURL=UsersController.js.map