const assets = require('./assets.js');
import { Entity } from './entity.js';

const COLUMN_SIZE = 120;
const ROW_SIZE = 120;

export class GameplayGrid extends Entity {
  constructor() {
    super();
    this.wallLocations = [];
  }

  load() {
    return assets.loadImage('images/wall.png').then(img => {
      this.wallImage = img;
    });
  }

  addWallPiece(x, y) {
    this.wallLocations.push({
      x: Math.floor(x / COLUMN_SIZE),
      y: Math.floor(y / ROW_SIZE)
    });
  }
  
  draw(canvas) {
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

  update(_elapsedTime) {
    // Do nothing
  }
}