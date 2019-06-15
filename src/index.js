const assets = require('./assets.js');
import { GameCanvas } from './canvas.js';
import { Monster } from './monster.js';

const gameCanvas = new GameCanvas(document.getElementById('main-canvas'));

const monster = new Monster();
monster.load().then(() => {
  monster.draw(gameCanvas);
});