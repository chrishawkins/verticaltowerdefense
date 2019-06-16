// @flow

import assets from './assets.js';
import Entity from './entity.js';
import GameCanvas from './canvas.js';
import Monster from './monster.js';
import Wall from './wall.js';
import { type Bounds } from './mathTypes.js';

const COLUMN_SIZE = 120;
const ROW_SIZE = 120;
const NUM_COLUMNS = 6;

export default class GameplayGrid extends Entity {
  monsters: Array<Monster>;
  walls: Array<Wall>;

  constructor() {
    super();
    this.walls = [];
    this.monsters = [];
  }

  load() {
  }

  addWallPiece(x: number, y: number) {
    const column = Math.floor(x / COLUMN_SIZE);
    const row = Math.floor(y / ROW_SIZE);
    const wall = new Wall(
      column * COLUMN_SIZE - 4,
      row * ROW_SIZE + 6);
    wall.load().then(() => this.walls.push(wall));
  }

  spawnMonster() {
    const column = Math.floor(Math.random() * NUM_COLUMNS);
    const monster = new Monster(column * COLUMN_SIZE);
    monster.load().then(() => this.monsters.push(monster));
  }
  
  draw(canvas: GameCanvas) {
    this.monsters.forEach(monster => monster.draw(canvas));
    this.walls.forEach(wall => wall.draw(canvas));
  }

  update(elapsedTime: number) {
    this.monsters.forEach(monster => {
      monster.update(elapsedTime);

      this.walls.forEach(wall => {
        if (!wall.isDestroyed) {
          monster.testWallCollision(wall);
        }
      });
    });
  }
}