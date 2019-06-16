// @flow

import assets from './assets.js';
import Entity from './entity.js';
import GameCanvas from './canvas.js';

const COLUMN_SIZE = 120;
const ROW_SIZE = 120;

type GridLocation = {| x: number, y: number |};

export default class GameplayGrid extends Entity {
  wallLocations: Array<GridLocation>;
  wallImage: Image;

  constructor() {
    super();
    this.wallLocations = [];
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
  
  draw(canvas: GameCanvas) {
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

  update(_elapsedTime: number) {
    // Do nothing
  }
}