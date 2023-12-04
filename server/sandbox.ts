import type { ViteDevServer } from 'vite';
import * as http from 'http';

const sandbox = {
  name: 'sandbox',
  configureServer(server: ViteDevServer) {
    if (!server.httpServer) return;

// Create an HTTP server
    const s = http.createServer((req, res) => {
      // Set the response header
      res.writeHead(200, { 'Content-Type': 'text/plain' });

      // Send a response
      res.end('Hello, World!\n');
    });

// Specify the port on which the server will listen
    const port = 3000;

// Start the server and listen on the specified port
    s.listen(port, () => {
      console.log('\x1b[32m%s\x1b[0m', `Sandbox server is running at http://localhost:${port}/`);
    });

  }
};

export default sandbox;
