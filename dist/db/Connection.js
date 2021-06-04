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
exports.MongoConnection = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
//SINGLETHON FOR CONNECTION
require('dotenv').config;
class MongoConnection {
    constructor() { }
    static connect() {
        return __awaiter(this, void 0, void 0, function* () {
            yield MongoConnection.dbConnection();
        });
    }
}
exports.MongoConnection = MongoConnection;
MongoConnection.dbConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    if (!mongoose_1.default.connection.readyState) {
        try {
            yield mongoose_1.default.connect(process.env.MONGODB_CNN || '', {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true,
                useFindAndModify: false
            }).then(c => {
                return console.info(`Conectado con éxito a MongoDB a DB: ${c.connection.db.databaseName}`);
            });
        }
        catch (error) {
            console.error(`Error de conexión a MongoDB: ${error}`);
            return process.exit(1);
        }
        ;
    }
    else {
        console.info('¡Conectado!', mongoose_1.default.connection.readyState);
    }
});
//# sourceMappingURL=Connection.js.map