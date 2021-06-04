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
exports.existDoctorById = exports.existDoctorEmail = exports.existHospitalById = exports.existHospital = exports.existUserById = exports.existEmail = void 0;
const Doctor_1 = __importDefault(require("../models/Doctor"));
const Hospital_1 = __importDefault(require("../models/Hospital"));
const User_1 = __importDefault(require("../models/User"));
/** Verificar existe email Usuario */
function existEmail(email) {
    return __awaiter(this, void 0, void 0, function* () {
        const existEmail = yield User_1.default.findOne({ email });
        if (existEmail) {
            throw new Error(`El email ya se encuentra registrado: ${email}.`);
        }
    });
}
exports.existEmail = existEmail;
;
/** Verificar existe Usuario por Id */
function existUserById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const existUser = yield User_1.default.findById(id);
        if (!existUser) {
            throw new Error(`El id no existe: ${id}.`);
        }
    });
}
exports.existUserById = existUserById;
;
/** Verificar existe Hospital */
function existHospital(name) {
    return __awaiter(this, void 0, void 0, function* () {
        const exist = yield Hospital_1.default.findOne({ name });
        if (exist) {
            throw new Error(`Hospital ya registrado con el nombre: ${name}.`);
        }
    });
}
exports.existHospital = existHospital;
/** Verificar existe Hospital por Id */
function existHospitalById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const exist = yield Hospital_1.default.findById(id);
        if (!exist) {
            throw new Error(`El id no existe: ${id}.`);
        }
        if (!exist.status) {
            throw new Error(`El Hospital no se encuentra activo: ${id}.`);
        }
    });
}
exports.existHospitalById = existHospitalById;
/** Verificar existe email de Doctor */
function existDoctorEmail(email) {
    return __awaiter(this, void 0, void 0, function* () {
        const existEmail = yield Doctor_1.default.findOne({ email });
        if (existEmail) {
            throw new Error(`El email del Doctor ya se encuentra registrado: ${email}.`);
        }
    });
}
exports.existDoctorEmail = existDoctorEmail;
;
/** Verificar existe Doctor por Id */
function existDoctorById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const exist = yield Doctor_1.default.findById(id);
        if (!exist) {
            throw new Error(`El id no existe: ${id}.`);
        }
        if (!exist.status) {
            throw new Error(`El Doctor no se encuentra activo: ${id}.`);
        }
    });
}
exports.existDoctorById = existDoctorById;
//# sourceMappingURL=Validators.js.map