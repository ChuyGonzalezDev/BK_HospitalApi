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
/** Importaciones */
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const Auth_1 = require("./routes/Auth");
const Users_1 = require("./routes/Users");
const Connection_1 = require("./db/Connection");
const Hospital_1 = require("./routes/Hospital");
const Doctor_1 = require("./routes/Doctor");
require('dotenv').config();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        /** Puerto */
        const port = process.env.PORT;
        /** Crear servidor/app de Express */
        const app = express_1.default();
        /** Conexión a BD */
        yield Connection_1.MongoConnection.connect();
        //dbConnection();
        /** Configuración CORS */
        app.use(cors_1.default());
        /** PATH Público */
        app.use(express_1.default.static('public'));
        /** Lectura y parseo del body */
        app.use(express_1.default.json());
        /** Rutas API */
        app.use('/login', Auth_1.authRouter);
        app.use('/users', Users_1.userRouter);
        app.use('/hospitals', Hospital_1.hospitalRouter);
        app.use('/doctors', Doctor_1.doctorRouter);
        /** Escucha el puerto en el que se ejecuta la API */
        app.listen(port, () => console.log(`Server running on port ${port} 🔥`));
    });
}
main();
//# sourceMappingURL=index.js.map