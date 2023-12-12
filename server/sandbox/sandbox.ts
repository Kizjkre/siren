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

    const tokens: { [key: string]: {} } = {};

    app.use(express.json());

    app.use((_: Request, res: Response, next: NextFunction): any => {
      res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
      next();
    });

    app.get('/:token', (req: Request, res: Response): any => {
      if (!(req.params.token in tokens)) {
        res.sendStatus(403);
        return;
      }

      const html: JSDOM = new JSDOM(readFileSync(__dirname + '/sandbox.html', 'utf8'));
      const doc: Document = html.window.document;
      const userscriptEl: HTMLScriptElement = doc.createElement('script');
      const portEl: HTMLScriptElement = doc.createElement('script');
      const actionEl: HTMLScriptElement = doc.createElement('script');
      const workletEl: HTMLScriptElement = doc.createElement('script');

      userscriptEl.type = 'inline-module';
      portEl.type = 'inline-module';
      actionEl.type = 'inline-module';
      workletEl.type = 'inline-module';

      userscriptEl.id = 'userscript';
      portEl.id = 'port';

      userscriptEl.textContent = tokens[req.params.token].userscript;
      // portEl.textContent = portCode;
      // actionEl.textContent = action;
      // workletEl.textContent = worklet;

      doc.body.append(workletEl, userscriptEl, portEl, actionEl);

      res.send(html.serialize());
    });

    app.post('/:token', (req: Request, res: Response): any => {
      try {
        jwt.verify(req.params.token, process.env.JWT_ACCESS_TOKEN!);

        tokens[req.params.token] = req.body;

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
