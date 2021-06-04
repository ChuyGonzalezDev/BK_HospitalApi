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
exports.deleteHospital = exports.update = exports.create = exports.getById = exports.get = void 0;
const express_1 = require("express");
const Hospital_1 = __importDefault(require("../models/Hospital"));
require('dotenv').config;
/** Obtener Hospitales con paginación */
function get(req = express_1.request, res = express_1.response) {
    return __awaiter(this, void 0, void 0, function* () {
        const { rows = 5, from = 0 } = req.query;
        /** Únicamente los activos. */
        const query = { status: true };
        const [total, hospitals] = yield Promise.all([
            Hospital_1.default.countDocuments(query),
            Hospital_1.default.find(query).skip(Number(from)).limit(Number(rows))
        ]);
        res.json({
            total,
            hospitals
        });
    });
}
exports.get = get;
;
/** Obtener Hospital por Id */
function getById(req = express_1.request, res = express_1.response) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        const hospital = yield Hospital_1.default.findById(id);
        res.json({ hospital });
    });
}
exports.getById = getById;
;
/** Crear Hospital */
function create(req, res = express_1.response) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name, address, cp, city, country, user } = req.body;
        const hospital = new Hospital_1.default({ name, address, cp, city, country, user });
        try {
            /** Se asignan valores por Default */
            hospital.status = true;
            /** Crear usuario en BD */
            const response = yield hospital.save();
            /** Respuesta exitosa */
            res.status(201).json({
                hospital: response,
                message: 'Creación de Hospital correctamente.'
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
/** Actualizar Hospital */
function update(req = express_1.request, res = express_1.response) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        const _a = req.body, { _id } = _a, hospital = __rest(_a, ["_id"]);
        const response = yield Hospital_1.default.findByIdAndUpdate(id, hospital);
        if (response) {
            res.status(200).json({
                hospital: {
                    id: id,
                    name: hospital.name,
                    address: hospital.address,
                    cp: hospital.cp,
                    city: hospital.city,
                    country: hospital.country,
                    user: hospital.user
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
/** Deshabilitar Hospital */
function deleteHospital(req = express_1.request, res = express_1.response) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        const response = yield Hospital_1.default.findByIdAndUpdate(id, { status: false });
        if (response) {
            res.status(200).json({
                hospital: {
                    id: id,
                    name: response.name,
                    status: false
                },
                message: 'Se deshabilito el Hospital correctamente.'
            });
        }
        else {
            res.status(400).json({
                message: 'Error al deshabilitar el Hospital.'
            });
        }
    });
}
exports.deleteHospital = deleteHospital;
//# sourceMappingURL=HospitalsController.js.map