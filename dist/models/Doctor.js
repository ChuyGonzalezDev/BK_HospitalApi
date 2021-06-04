"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
;
const DoctorSchema = new mongoose_1.Schema({
    name: { type: String, required: [true, 'El nombre es obligatorio'], unique: true },
    lastName: { type: String, required: [true, 'El apellido es obligatorio'], unique: true },
    age: { type: Number, required: [true, 'La edad es obligatoria'] },
    medicalSpeciality: { type: String, required: [true, 'La especialidad medica es obligatoria'] },
    phoneNumber: { type: String, required: [true, 'El número teléfonico es obligatorio'] },
    email: { type: String, required: [true, 'El correo eléctronico es obligatorio'] },
    user: {
        type: mongoose_1.Schema.Types.ObjectId, required: true, ref: 'User'
    },
    hospital: {
        type: mongoose_1.Schema.Types.ObjectId, required: true, ref: 'Hospital'
    },
    status: { type: Boolean }
}, { collection: 'doctors' });
DoctorSchema.methods.toJSON = function () {
    const _a = this.toObject(), { __v, _id } = _a, doctor = __rest(_a, ["__v", "_id"]);
    doctor.id = _id;
    return doctor;
};
/** Exporta el modelo y devuelve su interfaz */
exports.default = mongoose_1.default.model('Doctor', DoctorSchema);
//# sourceMappingURL=Doctor.js.map