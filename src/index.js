const assets = require('./assets.js');
import { GameCanvas } from './canvas.js';
import { Monster } from './monster.js';

const gameCanvas = new GameCanvas(document.getElementById('main-canvas'));

const monster = new Monster();

const entities = [ monster ];

Promise.all(
  entities.map(entity => entity.load())
).then(() => {
  requestAnimationFrame(gameLoop);
});

function gameLoop() {
  entities.forEach(entity => {
    entity.update();
  });
  gameCanvas.clear();
  entities.forEach(entity => {
    entity.draw(gameCanvas);
  });
  requestAnimationFrame(gameLoop);
}
