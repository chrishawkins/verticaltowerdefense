// @flow

import assets from './assets.js';
import Entity from './entity.js';
import GameCanvas from './canvas.js';
import Monster from './monster.js';
import { type Bounds } from './mathTypes.js';

const COLUMN_SIZE = 120;
const ROW_SIZE = 120;
const NUM_COLUMNS = 6;

type GridLocation = {| x: number, y: number |};

export default class GameplayGrid extends Entity {
  wallLocations: Array<GridLocation>;
  monsters: Array<Monster>;
  wallImage: Image;

  constructor() {
    super();
    this.wallLocations = [];
    this.monsters = [];
  }

  load() {
    return assets.loadImage('images/wall.png').then(img => {
      this.wallImage = img;
    });
  }

  addWallPiece(x: number, y: number) {
    this.wallLocations.push({
      x: Math.floor(x / COLUMN_SIZE),
      y: Math.floor(y / ROW_SIZE)
    });
  }

  spawnMonster() {
    const column = Math.floor(Math.random() * NUM_COLUMNS);
    const monster = new Monster(column * COLUMN_SIZE);
    monster.load().then(() => this.monsters.push(monster));
  }
  
  draw(canvas: GameCanvas) {
    this.monsters.forEach(monster => monster.draw(canvas));
    this.wallLocations.forEach(wallLocation => {
      canvas.drawImage(
        this.wallImage,
        wallLocation.x * COLUMN_SIZE - 4,
        wallLocation.y * ROW_SIZE + 6,
        128,
        108
      )
    });
  }

  update(elapsedTime: number) {
    this.monsters.forEach(monster => {
      monster.update(elapsedTime);

      this.wallLocations.forEach(wallLocation => {
        monster.testWallCollision(this._getBoundingBoxForWallLocation(wallLocation));
      });
    });
  }

  _getBoundingBoxForWallLocation(location: GridLocation) {
    // Return a bounding box that is slightly smaller than the wall
    // to make sure that passing monsters don't get distracted!
    return {
      x: location.x * COLUMN_SIZE + 20,
      y: location.y * ROW_SIZE + 20,
      width: COLUMN_SIZE - 40,
      height: ROW_SIZE - 40
    };
  }
}