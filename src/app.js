// express: Provides a server test
import express from 'express';
// path: Make the path of files.
import path from 'path';
import Youch from 'youch';
import * as Sentry from '@sentry/node';
// import the routes from a separated archive.
import 'express-async-errors';
import routes from './routes';

import './database';
import sentryConfig from './config/sentry';

class App {
  // When initialized, the class will call these functions in 'constructor'
  constructor() {
    // 'server' will hold the 'express' application of the app
    this.server = express();
    Sentry.init(sentryConfig);

    this.server.use(Sentry.Handlers.errorHandler());
    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  middlewares() {
    // setting the express to use JSON
    this.server.use(Sentry.Handlers.requestHandler());
    this.server.use(express.json());
    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
    );
  }

  // Function to determinate what routes server will use
  routes() {
    this.server.use(routes);
    this.server.use(Sentry.Handlers.errorHandler());
  }

  exceptionHandler() {
    this.server.use(async (err, req, res, next) => {
      const erros = await new Youch(err, req).toJSON();

      return res.status(500).json(erros);
    });
  }
}

// Provides the App out of the module
export default new App().server;
