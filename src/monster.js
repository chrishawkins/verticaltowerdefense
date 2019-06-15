const assets = require('./assets.js');
import { Entity } from './entity.js';

export class Monster extends Entity {
  constructor() {
    super();
    this.yPosition = 0;
  }

  load() {
    return assets.loadImage('images/green_blob.png').then(img => {
      this.image = img;
    });
  }

  draw(canvas) {
    canvas.drawImage(this.image, 25, this.yPosition, 128, 128);
  }

  update() {
    this.yPosition = this.yPosition + 1;
  }
}