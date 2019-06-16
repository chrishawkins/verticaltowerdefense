const assets = require('./assets.js');
import { Entity } from './entity.js';

export class Wall extends Entity {
  constructor(x, y) {
    super();
    this.xPosition = x;
    this.yPosition = y;
  }

  load() {
    return assets.loadImage('images/wall.png').then(img => {
      this.image = img;
    });
  }

  draw(canvas) {
    canvas.drawImage(this.image, this.xPosition, this.yPosition, 128, 108);
  }

  update(elapsedSec) {
  }
}