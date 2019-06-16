const assets = require('./assets.js');
import { Entity } from './entity.js';

export class Monster extends Entity {
  constructor() {
    super();
    this.yPosition = 0;
    this.scale = 1;
    this.totalTime = 0;
  }

  load() {
    return assets.loadImage('images/green_blob.png').then(img => {
      this.image = img;
    });
  }

  draw(canvas) {
    canvas.drawImage(this.image, 25, this.yPosition, 128, 128, this.scale);
  }

  update(elapsedSec) {
    this.yPosition = this.yPosition + 10 * elapsedSec;
    
    this.totalTime += elapsedSec;
    this.scale = 0.05 * Math.sin(2 * this.totalTime) + 1.0;
  }
}