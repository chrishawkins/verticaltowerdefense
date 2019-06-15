const assets = require('./assets.js');
import { GameCanvas } from './canvas.js';

const gameCanvas = new GameCanvas(document.getElementById('main-canvas'));

assets.loadImage('images/green_blob.png').then(img => {
  gameCanvas.drawImage(img, 25, 25, 128, 128);
});
