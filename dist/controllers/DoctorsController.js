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
exports.deleteDoctor = exports.update = exports.create = exports.getById = exports.get = void 0;
const express_1 = require("express");
const Doctor_1 = __importDefault(require("../models/Doctor"));
require('dotenv').config;
/** Obtener Doctores con paginación */
function get(req = express_1.request, res = express_1.response) {
    return __awaiter(this, void 0, void 0, function* () {
        const { rows = 5, from = 0 } = req.query;
        /** Únicamente los activos. */
        const query = { status: true };
        const [total, doctors] = yield Promise.all([
            Doctor_1.default.countDocuments(query),
            Doctor_1.default.find(query).skip(Number(from)).limit(Number(rows))
        ]);
        res.json({
            total,
            doctors
        });
    });
}
exports.get = get;
;
/** Obtener Doctores por Id */
function getById(req = express_1.request, res = express_1.response) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        const doctor = yield Doctor_1.default.findById(id);
        res.json({ doctor });
    });
}
exports.getById = getById;
;
/** Crear Doctor */
function create(req, res = express_1.response) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name, lastName, age, medicalSpeciality, phoneNumber, email, user, hospital } = req.body;
        const doctor = new Doctor_1.default({ name, lastName, age, medicalSpeciality, phoneNumber, email, user, hospital });
        try {
            /** Se asignan valores por Default */
            doctor.status = true;
            /** Crear usuario en BD */
            const response = yield doctor.save();
            /** Respuesta exitosa */
            res.status(201).json({
                doctor: response,
                message: 'Creación de Doctor correctamente.'
            });
        }
        catch (error) {
            return res.status(500).json({
                message: 'Por favor hable con el administrador.'
            });
        }
    });
}
exports.create = create;
;
/** Actualizar Doctor */
function update(req = express_1.request, res = express_1.response) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        const _a = req.body, { _id } = _a, doctor = __rest(_a, ["_id"]);
        const response = yield Doctor_1.default.findByIdAndUpdate(id, doctor);
        if (response) {
            res.status(200).json({
                doctor: {
                    id: id,
                    name: doctor.name,
                    lastName: doctor.lastName,
                    age: doctor.age,
                    medicalSpeciality: doctor.medicalSpeciality,
                    phoneNumber: doctor.medicalSpeciality,
                    email: doctor.medicalSpeciality,
                    user: doctor.medicalSpeciality,
                    hospital: doctor.medicalSpeciality
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
exports.update = update;
/** Deshabilitar Doctor */
function deleteDoctor(req = express_1.request, res = express_1.response) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        const response = yield Doctor_1.default.findByIdAndUpdate(id, { status: false });
        if (response) {
            res.status(200).json({
                Doctor: {
                    id: id,
                    name: response.name,
                    status: false
                },
                message: 'Se deshabilito el Doctor correctamente.'
            });
        }
        else {
            res.status(400).json({
                message: 'Error al deshabilitar el Doctor.'
            });
        }
    });
}
exports.deleteDoctor = deleteDoctor;
//# sourceMappingURL=DoctorsController.js.map