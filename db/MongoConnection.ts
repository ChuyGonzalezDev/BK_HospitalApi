import mongoose from 'mongoose';

const dbConnection = async (db: any) => {
  try {
    await mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }).then(() => {
      return console.info(`Conectado con éxito a MongoDB`);
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
