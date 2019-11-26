// express: Provides a server test
import express from 'express';
// path: Make the path of files.
import path from 'path';
// import the routes from a separated archive.
import routes from './routes';
import './database';

class App {
  // When initialized, the class will call these functions in 'constructor'
  constructor() {
    // 'server' will hold the 'express' application of the app
    this.server = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    // setting the express to use JSON
    this.server.use(express.json());
    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
    );
  }

  // Function to determinate what routes server will use
  routes() {
    this.server.use(routes);
  }
}

// Provides the App out of the module
export default new App().server;
