// Databe Index

// Sequelize: For PostgreSQL configuration
import Sequelize from 'sequelize';
// Mongoose: For MongoDB configuration
import mongoose from 'mongoose';
// DB settingd imported from another file for organization reasons
import databaseConfig from '../config/database';

// Models
import User from '../app/models/User';
import File from '../app/models/File';
import Appointment from '../app/models/Appointments';

// Array with all Models
const models = [User, File, Appointment];

class Database {
  constructor() {
    this.init();
    this.mongo();
  }

  // Connection with postgres Database
  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }

  // Connection with Mongo Database
  mongo() {
    this.mongoConnection = mongoose.connect(
      'mongodb://localhost:27017/gobarber',
      {
        useNewUrlParser: true,
        useFindAndModify: true,
        useUnifiedTopology: true,
      }
    );
  }
}

// Provides class to another files
export default new Database();
