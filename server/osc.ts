import type { ViteDevServer } from 'vite';
import { Server, Socket } from 'socket.io';
// @ts-ignore
import osc from 'osc';
import jwt from 'jsonwebtoken';

// noinspection JSUnusedGlobalSymbols
const oscServer: Object = {
  name: 'osc',
  configureServer(server: ViteDevServer): any {
    if (!server.httpServer) return;

    const connections: Set<string> = new Set();

    const io: Server = new Server(3001, {
      cors: {
        origin: 'http://localhost:5173'
      }
    });

    io.on('connection', (socket: Socket): any => {
      socket.on('access', (token: string): any => {
        jwt.verify(token, process.env.JWT_ACCESS_TOKEN!);
        connections.add(`/${ token }`);
      });
    });

    const udp: osc.UDPPort = new osc.UDPPort({
      metadata: true
    });

    udp.on('message', ({ address, args }: Object): any => {
      if (!connections.has(address)) return;
      io.emit(address, args);
    });

    udp.open();

    console.log('\x1b[32m%s\x1b[0m', 'UDP port open on port 57121 listening for OSC messages.\nWebSocket server listening on port 3001.');
  }
};

export default oscServer;
