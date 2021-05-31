import mongoose from 'mongoose';
import dotenv from 'dotenv';

//SINGLETHON FOR CONNECTION
dotenv.config();

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CNN || '',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
      }).then(() => {
        return console.info(`Conectado con éxito a MongoDB a BD: ${mongoose.connection.db.databaseName}`);
      }).catch(error => {
        console.error(`Error de conexión a MongoDB: ${error}`);
        return process.exit(1);
      });

  } catch (error) {
    console.error(error);
    throw new Error(`Error de conexión a MongoDB: ${error}`);
  }
};

mongoose.connection.on('disconnected', dbConnection);

export { dbConnection };
