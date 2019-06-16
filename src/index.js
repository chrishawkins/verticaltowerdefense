// @flow

import assets from './assets.js';
import GameCanvas from './canvas.js';
import Monster from './monster.js';
import ToolPalette from './toolPalette.js';
import InputHelper from './inputHelper.js';
import GameplayGrid from './gameplayGrid.js';

const gameCanvas = new GameCanvas((document.getElementById('main-canvas') : any));
new InputHelper(gameCanvas);

const grid = new GameplayGrid();
const entities = [ grid, new ToolPalette(gameCanvas, grid) ];

grid.spawnMonster();

let time = 0;

Promise.all(
  entities.map(entity => entity.load())
).then(() => {
  time = Date.now();
  requestAnimationFrame(gameLoop);
});

function gameLoop() {
  const newTime = Date.now();
  const elapsedTimeInSec = (newTime - time) / 1000;
  time = newTime;
  entities.forEach(entity => {
    entity.update(elapsedTimeInSec);
  });
  gameCanvas.clear();
  entities.forEach(entity => {
    entity.draw(gameCanvas);
  });
  requestAnimationFrame(gameLoop);
}
