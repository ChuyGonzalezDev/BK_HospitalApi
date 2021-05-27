import mongoose from 'mongoose';

const dbConnection = () => {
  try {
    const db = 'mongodb://localhost:27017/test';
    mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }).then(() => {
      return console.info(`Successfully connected to ${db}`);
    }).catch(error => {
      console.error('Error connecting to database: ', error);
      return process.exit(1);
    });
    
  } catch (error) {
    console.log(error);
    throw new Error("Error a la hora de inicializad DB");
  }
};

//mongoose.connection.on('disconnected', dbConnection);

export { dbConnection };
