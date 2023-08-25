// @ts-ignore
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, type Plugin, type ViteDevServer } from 'vite';
// @ts-ignore
import type * as http from 'node:http';

// REF: https://webcontainers.io/guides/troubleshooting#webcontainers-not-loading-and-postmessage-error
const headers: Plugin = {
  name: 'add-cors',
  configureServer: (server: ViteDevServer): void => {
    server.middlewares.use((_: http.IncomingMessage, res: http.ServerResponse, next: () => void): void => {
      res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
      res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
      res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
      next();
    });
  }
};


// noinspection JSUnusedGlobalSymbols
export default defineConfig({
  plugins: [sveltekit(), headers],
  server: {
    fs: {
      allow: ['.yarn']
    }
  }
});
