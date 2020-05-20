import * as ws from 'ws';
import App from './src/App';

(global as any).WebSocket = ws;

new App().bootstrap();
