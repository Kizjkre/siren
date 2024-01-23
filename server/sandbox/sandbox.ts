import type { ViteDevServer } from 'vite';
import express, { type Express, type NextFunction, type Request, type Response } from 'express';
import { readFileSync } from 'fs';

// noinspection JSUnusedGlobalSymbols
const sandbox = {
  name: 'sandbox',
  configureServer(server: ViteDevServer): any {
    if (!server.httpServer) return;

    const app: Express = express();
    const port: 3000 = 3000;

    app.use(express.json());

    app.use((_: Request, res: Response, next: NextFunction): any => {
      res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
      next();
    });

    app.get('/', (_: Request, res: Response): any =>
      res.send(readFileSync(__dirname + '/sandbox.html', 'utf8'))
    );

    app.listen(port, (): any => {
      console.log('\x1b[32m%s\x1b[0m', `Sandbox listening on port ${ port }.`);
    });
  }
};

export default sandbox;
