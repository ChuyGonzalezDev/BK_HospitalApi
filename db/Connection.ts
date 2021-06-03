import mongoose from 'mongoose';

//SINGLETHON FOR CONNECTION
require('dotenv').config

export class MongoConnection {
    private constructor() { }

    private static dbConnection = async () => {
        if (!mongoose.connection.readyState) {
            try {
                await mongoose.connect(process.env.MONGODB_CNN || '', {
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                    useCreateIndex: true,
                    useFindAndModify: false
                }).then(c => {
                    return console.info(`Conectado con éxito a MongoDB a DB: ${c.connection.db.databaseName}`);
                });
            } catch (error) {
                console.error(`Error de conexión a MongoDB: ${error}`);
                return process.exit(1);
            };
        }else{
            console.info('¡Conectado!',mongoose.connection.readyState);
        }
    }

    static async connect() {
        await MongoConnection.dbConnection();
    }
}