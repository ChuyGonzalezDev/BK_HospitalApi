import mongoose from 'mongoose';

const dbConnection = async (db: any) => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    }).then(() => {
      return console.info(`Conectado con éxito a MongoDB`);
    }).catch(error => {
      console.error('Error al conectarse a la base de datos: ', error);
      return process.exit(1);
    });

  } catch (error) {
    console.error(error);
    throw new Error(`Error al conectarse a la base de datos: ${error}`);
  }
};

mongoose.connection.on('disconnected', dbConnection);

export { dbConnection };
