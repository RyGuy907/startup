import { WebSocketServer } from 'ws';
import { v4 as uuidv4 } from 'uuid';

export function peerProxy(httpService) {
  const wss = new WebSocketServer({ noServer: true });

  httpService.on('upgrade', (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, (ws) => {
      wss.emit('connection', ws, request);
    });
  });

  let connections = [];

  wss.on('connection', (ws) => {
    const connection = { id: uuidv4(), alive: true, ws };
    connections.push(connection);

    ws.on('message', (data) => {
      connections.forEach((c) => {
        if (c.id !== connection.id) {
          c.ws.send(data);
        }
      });
    });

    ws.on('close', () => {
      connections = connections.filter((c) => c.id !== connection.id);
    });

    ws.on('pong', () => {
      connection.alive = true;
    });
  });

  setInterval(() => {
    connections.forEach((c) => {
      if (!c.alive) {
        c.ws.terminate();
      } else {
        c.alive = false;
        c.ws.ping();
      }
    });
  }, 10000);
}
