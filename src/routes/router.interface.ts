import * as express from 'express';

export interface IRouterWrapper {
  setupRoutes(): void;

  getRouter(): express.Router;
}