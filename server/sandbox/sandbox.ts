import type { ViteDevServer } from 'vite';
import express, { type Express, type NextFunction, type Request, type Response } from 'express';
import jwt from 'jsonwebtoken';
import { readFileSync } from 'fs';
import { JSDOM } from 'jsdom';

// noinspection JSUnusedGlobalSymbols
const sandbox = {
  name: 'sandbox',
  configureServer(server: ViteDevServer): any {
    if (!server.httpServer) return;

    const app: Express = express();
    const port: 3000 = 3000;

    const tokens: { [key: string]: { [key: string]: { [key: string]: string } } } = {};

    app.use(express.json());

    app.use((_: Request, res: Response, next: NextFunction): any => {
      res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
      next();
    });

    app.get('/:token/:key', (req: Request, res: Response): any => {
      if (!(req.params.token in tokens) || !(req.params.key in tokens[req.params.token])) {
        res.sendStatus(403);
        return;
      }

      const html: JSDOM = new JSDOM(readFileSync(__dirname + '/sandbox.html', 'utf8'));
      const doc: Document = html.window.document;
      const scripts: HTMLScriptElement[] = Object.entries(tokens[req.params.token][req.params.key])
        .map(([key, value]: [string, string]): HTMLScriptElement => {
          const script: HTMLScriptElement = doc.createElement('script');
          script.type = 'inline-module';
          script.id = key;
          script.textContent = value;
          return script;
        });

      doc.body.append(...scripts);

      delete tokens[req.params.token][req.params.key];

      res.send(html.serialize());
    });

    app.post('/:token/:key', (req: Request, res: Response): any => {
      try {
        jwt.verify(req.params.token, process.env.JWT_ACCESS_TOKEN!);

        if (!(req.params.token in tokens)) tokens[req.params.token] = {};

        tokens[req.params.token][req.params.key] = req.body;

        res.sendStatus(200);
      } catch {
        res.sendStatus(403);
      }
    });

    app.listen(port, (): any => {
      console.log('\x1b[32m%s\x1b[0m', `Sandbox listening on port ${ port }.`);
    });
  }
};

export default sandbox;
